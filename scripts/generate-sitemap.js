require("dotenv").config();

const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");
const axios = require("axios");

const API = process.env.API_URL;
const SITE_URL = process.env.SITE_URL;

async function generateSitemap() {
  try {
    const smStream = new SitemapStream({
      hostname: SITE_URL,
    });

    // ==========================
    // Static Pages
    // ==========================

    const staticPages = [
      "/",
      "/about",
      "/contact",
      "/product",
    ];

    staticPages.forEach((page) => {
      smStream.write({
        url: page,
        changefreq: "weekly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      });
    });

    // ==========================
    // Categories
    // ==========================

    try {
      const categoryRes = await axios.get(`${API}/api/category`);

      const categories = categoryRes.data.data || [];

      categories.forEach((category) => {
        // Replace "slug" with "_id" if your app uses IDs in URLs
        const categoryPath = category.slug || category._id;

        smStream.write({
          url: `/category/${categoryPath}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: category.updatedAt || new Date().toISOString(),
        });
      });
    } catch (err) {
      console.log("Category fetch failed");
    }

    // ==========================
    // Products
    // ==========================

    try {
      const productRes = await axios.get(`${API}/api/product`);

      const products = productRes.data.data || [];

      products.forEach((product) => {
        // Replace "slug" with "_id" if your app uses IDs in URLs
        const productPath = product.slug || product._id;

        smStream.write({
          url: `/product/${productPath}`,
          changefreq: "weekly",
          priority: 0.9,
          lastmod: product.updatedAt || new Date().toISOString(),
        });
      });
    } catch (err) {
      console.log("Product fetch failed");
    }

    smStream.end();

    const sitemap = await streamToPromise(smStream);

    fs.writeFileSync(
      "./public/sitemap.xml",
      sitemap.toString()
    );

    console.log("✅ sitemap.xml generated successfully");
  } catch (error) {
    console.error(error);
  }
}

generateSitemap();