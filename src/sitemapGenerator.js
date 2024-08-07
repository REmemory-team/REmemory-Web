const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

// Define your routes
const routes = [
  { url: "/", changefreq: "daily", priority: 0.9 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  // Add more routes as needed
];

async function generateSitemap() {
  const sitemapStream = new SitemapStream({
    hostname: "https://rememory.site",
  });
  const writeStream = createWriteStream(
    path.resolve(__dirname, "../public/sitemap.xml")
  );

  sitemapStream.pipe(writeStream);

  routes.forEach((route) => {
    sitemapStream.write(route);
  });

  sitemapStream.end();

  // Wait for the stream to finish
  await streamToPromise(sitemapStream);
}

generateSitemap()
  .then(() => {
    console.log("Sitemap generated successfully.");
  })
  .catch((error) => {
    console.error("Error generating sitemap:", error);
  });
