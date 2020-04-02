import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from './schema-jats.js';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { boxedTextExampleDOM } from './content.js';

let mySchema;
let myState;
let myView;

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
  plugins: [...exampleSetup({ schema: mySchema })]
});

// 3. Create a new view, and mount it to the document body.
myView = new EditorView(document.body, {
  state: myState
});
