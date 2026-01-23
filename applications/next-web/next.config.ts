import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const getOutputType = () => {
  if (process.env.NODE_ENV === "production") {
    return "standalone";
  }

  return null;
};

const output = getOutputType();

const config: NextConfig = {
  cacheComponents: true,
  ...(output && { output }),
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ['lucide-react', '@keeper.sh/ui'],
  },
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "better-auth",
    "@polar-sh/better-auth",
    "@polar-sh/sdk",
  ],
  transpilePackages: [
    "@keeper.sh/auth",
    "@keeper.sh/database",
    "@keeper.sh/env",
    "@keeper.sh/log",
    "@keeper.sh/data-schemas",
    "@keeper.sh/premium",
    "@keeper.sh/broadcast-client",
    "@keeper.sh/ui",
  ],
  turbopack: {
    rules: {
      "*.svg": {
        as: "*.js",
        loaders: ["@svgr/webpack"],
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(config);
