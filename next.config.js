/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/UtatanPortal",
  assetPrefix: "/UtatanPortal/",  // スラッシュを末尾に追加
  trailingSlash: true,  // 追加：URLの末尾にスラッシュを付ける
};

module.exports = nextConfig;