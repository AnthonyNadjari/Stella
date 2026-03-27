const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/Stella" : "",
  assetPrefix: isProd ? "/Stella/" : "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  staticPageGenerationTimeout: 180,
};

module.exports = nextConfig;
