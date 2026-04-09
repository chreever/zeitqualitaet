module.exports = function(eleventyConfig) {
  // 1. Diese Ordner werden 1:1 in das fertige Verzeichnis kopiert
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");

  // 2. FEHLER-FIX: Filter für "lower" (Netlify braucht das, weil Liquid nur "downcase" kennt)
  eleventyConfig.addFilter("lower", function(value) {
    if (!value) return "";
    return String(value).toLowerCase();
  });

  // 3. Filter für die Lesezeit (Eleventy rechnet das jetzt aus)
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1";
    const text = String(content).replace(/<[^>]*>/g, ''); // HTML-Tags entfernen
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  // 4. WICHTIG: Definiert die Gruppe "posts", damitcollections.posts funktioniert
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });

  // 5. Build-Konfiguration
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
