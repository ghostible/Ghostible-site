import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};
module.exports = {
  images: {
    domains: ['static.vecteezy.com'],
  },
};

export default nextConfig;
