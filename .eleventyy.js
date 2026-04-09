module.exports = function(eleventyConfig) {
  // Diese Ordner werden 1:1 kopiert
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");

  // Filter für die Lesezeit (Eleventy rechnet das jetzt aus!)
  eleventyConfig.addFilter("readingTime", function(content) {
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
