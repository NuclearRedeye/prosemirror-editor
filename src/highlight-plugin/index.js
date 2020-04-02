import { Plugin } from 'prosemirror-state';
import { trackPlugin } from '../track-changes-plugin/index.js';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const highlightPlugin = new Plugin({
  state: {
    init() {
      return { deco: DecorationSet.empty, commit: null };
    },
    apply(tr, prev, oldState, state) {
      let highlight = tr.getMeta(this);
      if (highlight && highlight.add != null && prev.commit != highlight.add) {
        let tState = trackPlugin.getState(oldState);
        let decos = tState.blameMap
          .filter((span) => tState.commits[span.commit] == highlight.add)
          .map((span) => Decoration.inline(span.from, span.to, { class: 'highlight' }));
        return { deco: DecorationSet.create(state.doc, decos), commit: highlight.add };
      } else if (highlight && highlight.clear != null && prev.commit == highlight.clear) {
        return { deco: DecorationSet.empty, commit: null };
      } else if (tr.docChanged && prev.commit) {
        return { deco: prev.deco.map(tr.mapping, tr.doc), commit: prev.commit };
      } else {
        return prev;
      }
    }
  },
  props: {
    decorations(state) {
      return this.getState(state).deco;
    }
  }
});
