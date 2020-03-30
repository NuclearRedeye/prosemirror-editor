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
</boxed-text>
<p>It is commonly accepted that genetic sequences coded within DNA are passed down through generations and can influence characteristics such as appearance, behavior and health. However, emerging evidence suggests that some traits can also be inherited &#x2018;epigenetically&#x2019; from information that is independent of the DNA sequence.</p>
<p>One of the ways characteristics may be epigenetically passed down is through the temporary modification of histone proteins which help to package DNA into the cell. Histones are adorned with chemical marks that can regulate how and when a gene is expressed by changing how tightly the DNA is wrapped. These marks are typically removed before genetic information is passed on to the next generation, but some sites escape erasure (
<xref ref-type="bibr" rid="bib3">Heard and Martienssen, 2014</xref>; 
<xref ref-type="bibr" rid="bib6">Kelly, 2014</xref>; 
<xref ref-type="bibr" rid="bib9">Miska and Ferguson-Smith, 2016</xref>).
</p>
<p>It has previously been reported that genetic mutations in an enzyme complex called COMPASS increase the lifespan of tiny worms called 
<italic>Caenorhabditis elegans</italic> (
<xref ref-type="bibr" rid="bib1">Greer et al., 2010</xref>). This complex acts on histones and creates a chemical mark called H3K4me, which is typically associated with less compact DNA and higher gene expression. When these mutants mate with wild-type worms they generate descendants that no longer have COMPASS mutations. Although these wild-type offspring recover normal levels of H3K4me, they still inherit the long-lived phenotype which they sustain for several generations (
<xref ref-type="bibr" rid="bib2">Greer et al., 2011</xref>). This observation suggests that an epigenetic mechanism that is independent from the gene mutation causes this inherited longevity. Now, in eLife, David Katz and co-workers at the Emory University School of Medicine in Atlanta &#x2013; including Teresa Lee as first author &#x2013; report a possible mechanism to explain how this longer lifespan is epigenetically inherited across multiple generations (
<xref ref-type="bibr" rid="bib8">Lee et al., 2019</xref>).
</p>
<p>Previous work showed that one of the COMPASS complex mutants, known as 
<italic>wdr-5,</italic> has increased levels of another histone mark called H3K9me2 (
<xref ref-type="bibr" rid="bib7">Kerr et al., 2014</xref>). This epigenetic mark generally promotes DNA compaction and appears to antagonize the action of H3K4me. This led Lee et al. to question whether the elevated levels of H3K9me2 may be important for the inheritance of this extended lifespan in 
<italic>wdr-5</italic> worms.
</p>
<p>To test their hypothesis, the team carefully monitored the levels and patterns of H3K9me2 in the mutants. Surprisingly, they found that homozygous 
<italic>wdr-5</italic> mutants, which had descended from ancestors carrying one copy of the mutated 
<italic>wdr-5</italic> gene and one wild-type copy for multiple generations, did not live for longer than their non-mutant counterparts. This indicates that the mutation carried by 
<italic>wdr-5</italic> worms did not immediately cause a lifespan change. However, future generations of worms that maintained the homozygous 
<italic>wdr-5</italic> mutation had an increasingly longer lifespan, suggesting that the accumulation of an epigenetic signal across generations promotes longer living. These late generation 
<italic>wdr-5</italic> mutants had higher levels of H3K9me2, and they were able to pass on this extended longevity to their progeny following mating with wild-type worms as previously reported (
<xref ref-type="bibr" rid="bib2">Greer et al., 2011</xref>).
</p>
<p>Next, Lee et al. manipulated the levels of H3K9me2 to see how this affected the phenotype of the late generation, long-lived 
<italic>wdr-5</italic> worms. First, they blocked the gain in H3K9me2 levels in the mutants by introducing a defective version of an enzyme called MET-2 which normally promotes the addition of H3K9me2 (
<xref ref-type="fig" rid="fig1">Figure 1</xref>). As a result, neither the 
<italic>wdr-5</italic> mutants nor their descendants experienced a longer lifespan. Lee et al. reasoned that if higher H3K9me2 levels are responsible for longevity, then increasing the amount of H3K9me2 by a different mutation should result in the same phenotype as the 
<italic>wdr-</italic>5 worms. They found that worms with defects in the enzyme JHDM-1, which is predicted to remove H3K9me2, not only lived longer but also passed on this trait to their wild-type progeny for several generations. Together, these data strongly suggest that increased H3K9me2 levels contribute to extended longevity and its inheritance.
</p>
<fig id="fig1" position="float">
<label>Figure 1.</label>
<caption>
  <title>Certain epigenetic changes are linked to the inheritance of extended lifespans in worms.</title>
  <p>Top: The WDR-5 enzyme helps to place the H3K4me mark (green), which promotes gene expression, on proteins called histones (brown circle) that package DNA (grey ribbon). In parallel, the MET-2 enzyme places the H3K9me2 mark (red), which represses gene expression. The two marks functionally antagonize each other. An enzyme called JHDM-1 is predicted to remove H3K9me2. Bottom: Worms with mutations in 
    <italic>wdr-5</italic> or 
    <italic>jhdm-1</italic> (left) that have low levels of H3K4me (green arrow), also show higher levels of H3K9me2 (red arrow) and an increased lifespan (grey arrow). When these long-lived mutants are mated to wild-type worms with a normal lifespan, their genetically wild-type offspring (right) are still long-lived for several generations (grey arrow). These worms show normal levels of H3K4me mark (green square) and regions of sustained increase in H3K9me2 (red arrow) inherited from their mutant ancestors.
  </p>
</caption>
<graphic xlink:href="elife-54296-fig1.jpg" mimetype="image" mime-subtype="tiff"/>
<attrib>Image credit: Cheng-Lin Li.</attrib>
</fig>
<p>To build on these findings, Lee et al. explored where the H3K9me2 marks were deposited in the genomes of the worms. As expected, long-lived 
<italic>wdr-5</italic> and 
<italic>jhdm-1</italic> mutants have more H3K9me2 marks spread across their genomes. Critically, Lee et al. found that specific genes in the wild-type offspring of 
<italic>jhdm-1</italic> mutants had higher levels of H3K9me2. These results are intriguing and suggest that increasing H3K9me2 levels in certain genes may be the key to passing on this long living phenotype to future generations. Exciting future investigations will be to identify all the gene regions associated with the inherited increase in H3K9me2, and to&#x00A0;understand how changes to DNA packaging and gene expression in those regions influence longevity.
</p>
<p>A handful of previous studies in 
<italic>C. elegans</italic> have demonstrated that specific histone modifications can be inherited across generations (
<xref ref-type="bibr" rid="bib5">Katz et al., 2009</xref>; 
<xref ref-type="bibr" rid="bib7">Kerr et al., 2014</xref>; 
<xref ref-type="bibr" rid="bib4">Kaneshiro et al., 2019</xref>). However, the paper by Lee et al. is the first to tie together the inheritance of a histone mark to longer lifespan. H3K9me2 is an evolutionarily conserved histone mark which is known to preserve spatial organization during cell division in organisms ranging from humans to worms (
<xref ref-type="bibr" rid="bib10">Poleshko et al., 2019</xref>). Going forward, it will be interesting to study whether H3K9me2 also participates in how traits are inherited across multiple generations in mammals.
</p>
</body>
</article>
`;

export const boxedTextExampleDOM = parser.parseFromString(boxedTextExample, 'text/xml');
