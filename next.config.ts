import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "lucide-react": "./src/lib/lucide-react-shim.tsx",
    },
  },
  webpack: (config) => {
    config.resolve.alias["lucide-react"] = require.resolve("./src/lib/lucide-react-shim.tsx");
    return config;
  },
};

export default nextConfig;
