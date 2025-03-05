import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mybrainhome.com",
        port: "",
        pathname: "/public/**",
        search: "",
      },
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
