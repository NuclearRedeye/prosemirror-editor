import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { Mapping } from 'prosemirror-transform';
import { schema } from './schema-jats.js';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { boxedTextExample, boxedTextExampleDOM } from './content.js';

import { trackPlugin } from './track-changes-plugin/index.js';
import { highlightPlugin } from './highlight-plugin/index.js';

let mySchema;
let myState;
let myView;
let userId = 'Joel Summerfield';

// Handler for when new transactions, e.g. changes, are dispatched from the view. By handling transactions here myself,
// I can decide on what I want to do. Here, I just simply apply the transaction to the state, and then update the view
// with the new state.
// NOTE: that 'this' is bound to the view that the transaction was raised on, hence...
//       myView.updateState() === this.updateState()
function onTransaction(transaction) {
  console.log('onTransaction() Called');
  myState = myState.apply(transaction);
  myView.updateState(myState);
  renderCommits(myState, onTransaction);
}

// Handler for when a user saves changes. So the intent here is that when they save/commit their changes they are stored
// as a changeSet, in this case using the 'trackPlugin'.
function onPublish() {
  onTransaction(myState.tr.setMeta(trackPlugin, userId));
}

function createElement(name, attrs, ...children) {
  let dom = document.createElement(name);
  if (attrs) for (let attr in attrs) dom.setAttribute(attr, attrs[attr]);
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    dom.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
  }
  return dom;
}

let lastRendered = null;
function renderCommits(state, dispatch) {
  let curState = trackPlugin.getState(state);
  if (lastRendered == curState) return;
  lastRendered = curState;

  let out = document.querySelector('#changes');
  out.textContent = '';
  let commits = curState.commits;
  commits.forEach((commit) => {
    let node = createElement(
      'li',
      { class: 'change' },
      createElement('img', { class: 'avatar', src: 'avatar.jpg' }),
      createElement('div', { class: 'date' }, commit.time.toLocaleString('en-GB', { timeZone: 'UTC' })),
      createElement('div', { class: 'user' }, commit.message),
      createElement('div', { class: 'body' }, 'Something about the number of edits, and why, or whatever.'),
      createElement('button', { class: 'revert' }, 'revert')
    );
    node.lastChild.addEventListener('click', () => revertCommit(commit));
    node.addEventListener('mouseover', (e) => {
      if (!node.contains(e.relatedTarget)) onTransaction(state.tr.setMeta(highlightPlugin, { add: commit }));
    });
    node.addEventListener('mouseout', (e) => {
      if (!node.contains(e.relatedTarget)) onTransaction(state.tr.setMeta(highlightPlugin, { clear: commit }));
    });
    out.appendChild(node);
  });
}

function revertCommit(commit) {
  let trackState = trackPlugin.getState(myState);
  let index = trackState.commits.indexOf(commit);
  // If this commit is not in the history, we can't revert it
  if (index == -1) return;

  // Reverting is only possible if there are no uncommitted changes
  if (trackState.uncommittedSteps.length) return alert('Commit your changes first!');

  // This is the mapping from the document as it was at the start of
  // the commit to the current document.
  let remap = new Mapping(trackState.commits.slice(index).reduce((maps, c) => maps.concat(c.maps), []));
  let tr = myState.tr;
  // Build up a transaction that includes all (inverted) steps in this
  // commit, rebased to the current document. They have to be applied
  // in reverse order.
  for (let i = commit.steps.length - 1; i >= 0; i--) {
    // The mapping is sliced to not include maps for this step and the
    // ones before it.
    let remapped = commit.steps[i].map(remap.slice(i + 1));
    if (!remapped) continue;
    let result = tr.maybeStep(remapped);
    // If the step can be applied, add its map to our mapping
    // pipeline, so that subsequent steps are mapped over it.
    if (result.doc) remap.appendMap(remapped.getMap(), i);
  }
  // Add a commit message and dispatch.
  if (tr.docChanged) onTransaction(tr.setMeta(trackPlugin, userId));
}

// 1. Create a schema, in this case I've modified the demo schema to support more JATS elements, and here I essentially
//    create a new schema and merge in support for list nodes from the schema-list plugin. This gives me support for ul
//    in the main body text.
mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks
});

// 2. Create a state, in this case I'm creating a very basic state.
myState = new EditorState.create({
  doc: DOMParser.fromSchema(mySchema).parse(boxedTextExampleDOM),
  schema: mySchema,
  plugins: [...exampleSetup({ schema: mySchema }), trackPlugin, highlightPlugin]
});

// 3. Create a new view, and mount it to the document body.
myView = new EditorView(document.getElementById('editor'), {
  state: myState,
  dispatchTransaction: onTransaction
});

const publish = document.getElementById('publish');
publish.addEventListener('click', onPublish);

// Insert some dummy data
onTransaction(myState.tr.insertText('Type something, and then commit it.'));
onTransaction(myState.tr.setMeta(trackPlugin, userId));
