import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Support was folded into the Partner page — keep old links working.
      { source: "/support", destination: "/partner", permanent: true },
    ];
  },
};

export default nextConfig;
