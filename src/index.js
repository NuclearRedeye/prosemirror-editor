import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from './schema-jats.js';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { boxedTextExample, boxedTextExampleDOM } from './content.js';

import { trackChangesPlugin } from './track-changes-plugin/index.js';

let mySchema;
let myState;
let myView;

// Handler for when new transactions, e.g. changes, are dispatched from the view. By handling transactions here myself,
// I can decide on what I want to do. Here, I just simply apply the transaction to the state, and then update the view
// with the new state.
// NOTE: that 'this' is bound to the view that the transaction was raised on, hence...
//       myView.updateState() === this.updateState()
function onTransaction(transaction) {
  console.log('onTransaction() Called');
  myState = myState.apply(transaction);
  myView.updateState(myState);
}

// Handler for when a user saves changes. So the intent here is that when they save/commit their changes they are stored
// as a changeSet.
function onPublish(event) {
  onTransaction(myState.tr.setMeta(trackChangesPlugin, 'Hello from onSave()'));
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
  plugins: [...exampleSetup({ schema: mySchema }), trackChangesPlugin]
});

// 3. Create a new view, and mount it to the document body.
myView = new EditorView(document.getElementById('editor'), {
  state: myState,
  dispatchTransaction: onTransaction
});

const publish = document.getElementById('publish');
publish.addEventListener('click', onPublish);
