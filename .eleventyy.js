module.exports = function(eleventyConfig) {
  // Diese Ordner werden von Eleventy einfach 1:1 in die fertige Website kopiert
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");

  // DER TRICK: Wir kopieren die Markdown-Dateien zusätzlich in einen Ordner "raw-posts".
  // So finden deine bisherigen JavaScript-Suche und Banner die Daten weiterhin, 
  // während Eleventy gleichzeitig echte HTML-Seiten für Google baut.
  eleventyConfig.addPassthroughCopy({ "posts": "raw-posts" });

  return {
    dir: {
      input: ".",          // Deine Arbeitsdateien liegen im Hauptverzeichnis
      output: "_site",     // Hier baut Eleventy die fertige Website rein
      includes: "_includes"// Hier liegt dein neues Master-Layout
    }
  };
};
