const parser = new DOMParser();

export const boxedTextExample = `
<article xmlns:xlink="http://www.w3.org/1999/xlink">
<body>
<boxed-text>
<p>
<bold>Related research article</bold> Lee TW, David HS, Engstrom AK, Carpenter BS, Katz DJ. 2019. Repressive H3K9me2 protects lifespan against the transgenerational burden of COMPASS activity in&#x00A0;
<italic>C. elegans</italic>. 
<italic>eLife</italic>
<bold>8</bold>:e48498. doi: 
<ext-link ext-link-type="uri" xlink:href="http://doi.org/10.7554/eLife.48498">10.7554/eLife.48498</ext-link>
</p>
<p>
Rendering a boxed-text element using prosemirror.
</p>
</boxed-text>
</body>
</article>
`;

export const boxedTextExampleDOM = parser.parseFromString(boxedTextExample, 'text/xml');

export const defaultExample = `
<h3>Hello ProseMirror</h3>
<p>This is editable text. You can focus it and start typing.</p>
<p>
  To apply styling, you can select a piece of text and manipulate its styling from the menu. The basic schema
  supports <em>emphasis</em>, <strong>strong text</strong>, <a href="http://marijnhaverbeke.nl/blog">links</a>,
  <code>code font</code>, and <img src="/img/smiley.png" /> images.
</p>
<p>
  Block-level structure can be manipulated with key bindings (try ctrl-shift-2 to create a level 2 heading, or
  enter in an empty textblock to exit the parent block), or through the menu.
</p>
<p>Try using the “list” item in the menu to wrap this paragraph in a numbered list.</p>
`;

export const defaultExampleDOM = parser.parseFromString(defaultExample, 'text/html');
