// import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的HTMLとしてエクスポート
  images: {
    unoptimized: true, // GitHub Pagesでは画像最適化が使えないため
  },
  // リポジトリ名がルートパスでない場合（例: username.github.io/repo-name）
  basePath: "/UtatanPortal", // あなたのリポジトリ名に置き換えてください
  assetPrefix: "/UtatanPortal", // リポジトリ名と同じ値を設定
};

module.exports = nextConfig;