module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });

  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1";
    const text = String(content).replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  return {
    dir: { input: ".", output: "_site", includes: "_includes" }
  };
};
