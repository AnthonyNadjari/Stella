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
  // Force webpack to transpile ESM-only packages (remark/rehype ecosystem)
  transpilePackages: [
    "next-mdx-remote",
    "remark-gfm",
    "remark-math",
    "rehype-katex",
    "rehype-slug",
    "rehype-autolink-headings",
  ],
};

module.exports = nextConfig;
