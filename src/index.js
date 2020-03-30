import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from './schema-jats.js';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { boxedTextExampleDOM } from './content.js';

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks
});

window.view = new EditorView(document.body, {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(boxedTextExampleDOM),
    plugins: exampleSetup({ schema: mySchema })
  })
});
