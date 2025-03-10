import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.pelayofelgueroso.es",
        port: "",
        pathname: "/wp-content/uploads/**",
        search: "",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
