module.exports = function(eleventyConfig) {
  // 1. Ordner 1:1 kopieren
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");

  // 2. WICHTIG: Die Gruppe "posts" definieren (Damit collections.posts funktioniert)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });

  // 3. Filter für die Lesezeit (mit Absturz-Schutz)
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1";
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, ''); // HTML entfernen
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
