/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Support MDX
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Increase static generation timeout
  staticPageGenerationTimeout: 180,
};

module.exports = nextConfig;
