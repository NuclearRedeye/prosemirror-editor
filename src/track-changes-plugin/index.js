import { Plugin } from 'prosemirror-state';

class Span {
  constructor(from, to, commit) {
    this.from = from;
    this.to = to;
    this.commit = commit;
  }
}

class Commit {
  constructor(message, time, steps, maps, hidden) {
    this.message = message;
    this.time = time;
    this.steps = steps;
    this.maps = maps;
    this.hidden = hidden;
  }
}

class TrackState {
  constructor(blameMap, commits, uncommittedSteps, uncommittedMaps) {
    // The blame map is a data structure that lists a sequence of
    // document ranges, along with the commit that inserted them. This
    // can be used to, for example, highlight the part of the document
    // that was inserted by a commit.
    this.blameMap = blameMap;
    // The commit history, as an array of objects.
    this.commits = commits;
    // Inverted steps and their maps corresponding to the changes that
    // have been made since the last commit.
    this.uncommittedSteps = uncommittedSteps;
    this.uncommittedMaps = uncommittedMaps;
  }

  // Apply a transform to this state
  applyTransform(transform) {
    // Invert the steps in the transaction, to be able to save them in
    // the next commit
    let inverted = transform.steps.map((step, i) => step.invert(transform.docs[i]));
    let newBlame = updateBlameMap(this.blameMap, transform, this.commits.length);
    // Create a new state—since these are part of the editor state, a
    // persistent data structure, they must not be mutated.
    return new TrackState(
      newBlame,
      this.commits,
      this.uncommittedSteps.concat(inverted),
      this.uncommittedMaps.concat(transform.mapping.maps)
    );
  }

  // When a transaction is marked as a commit, this is used to put any
  // uncommitted steps into a new commit.
  applyCommit(message, time) {
    if (this.uncommittedSteps.length == 0) return this;
    let commit = new Commit(message, time, this.uncommittedSteps, this.uncommittedMaps);
    return new TrackState(this.blameMap, this.commits.concat(commit), [], []);
  }
}

function updateBlameMap(map, transform, id) {
  let result = [],
    mapping = transform.mapping;
  for (let i = 0; i < map.length; i++) {
    let span = map[i];
    let from = mapping.map(span.from, 1),
      to = mapping.map(span.to, -1);
    if (from < to) result.push(new Span(from, to, span.commit));
  }

  for (let i = 0; i < mapping.maps.length; i++) {
    let map = mapping.maps[i],
      after = mapping.slice(i + 1);
    map.forEach((_s, _e, start, end) => {
      insertIntoBlameMap(result, after.map(start, 1), after.map(end, -1), id);
    });
  }

  return result;
}

function insertIntoBlameMap(map, from, to, commit) {
  if (from >= to) return;
  let pos = 0,
    next;
  for (; pos < map.length; pos++) {
    next = map[pos];
    if (next.commit == commit) {
      if (next.to >= from) break;
    } else if (next.to > from) {
      // Different commit, not before
      if (next.from < from) {
        // Sticks out to the left (loop below will handle right side)
        let left = new Span(next.from, from, next.commit);
        if (next.to > to) map.splice(pos++, 0, left);
        else map[pos++] = left;
      }
      break;
    }
  }

  while ((next = map[pos])) {
    if (next.commit == commit) {
      if (next.from > to) break;
      from = Math.min(from, next.from);
      to = Math.max(to, next.to);
      map.splice(pos, 1);
    } else {
      if (next.from >= to) break;
      if (next.to > to) {
        map[pos] = new Span(to, next.to, next.commit);
        break;
      } else {
        map.splice(pos, 1);
      }
    }
  }

  map.splice(pos, 0, new Span(from, to, commit));
}

export const trackPlugin = new Plugin({
  state: {
    init(_, instance) {
      return new TrackState([new Span(0, instance.doc.content.size, null)], [], [], []);
    },
    apply(tr, instance) {
      if (tr.docChanged) instance = instance.applyTransform(tr);
      let commitMessage = tr.getMeta(this);
      if (commitMessage) instance = instance.applyCommit(commitMessage, new Date(tr.time));
      return instance;
    }
  }
});
