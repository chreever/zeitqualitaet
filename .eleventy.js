module.exports = function(eleventyConfig) {
  // 1. Diese Ordner werden 1:1 in das fertige Verzeichnis kopiert
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");
  
  // NEU: Damit auch dein Design (CSS) kopiert wird!
  eleventyConfig.addPassthroughCopy("css"); 

  // NEU: Wenn du an deinem Design arbeitest, lädt der Browser nun automatisch neu
  eleventyConfig.addWatchTarget("./css/");

  // 2. FEHLER-FIX: Filter für "lower"
  eleventyConfig.addFilter("lower", function(value) {
    if (!value) return "";
    return String(value).toLowerCase();
  });

  // 3. Filter für die Lesezeit
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1";
    const text = String(content).replace(/<[^>]*>/g, ''); 
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  // NEU: 4. Filter für ein schönes deutsches Datum (z.B. für Blogbeiträge)
  eleventyConfig.addFilter("formatDate", function(dateObj) {
    return new Date(dateObj).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  });

  // 5. WICHTIG: Definiert die Gruppe "posts"
  // NEU: .reverse() sorgt dafür, dass der neueste Beitrag immer ganz oben steht!
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").reverse(); 
  });

  // 6. Build-Konfiguration
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
