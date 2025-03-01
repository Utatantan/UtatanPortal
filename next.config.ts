// import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的HTMLとしてエクスポート
  images: {
    unoptimized: true, // GitHub Pagesでは画像最適化が使えないため
  },
  // リポジトリ名がルートパスでない場合（例: username.github.io/repo-name）
  // basePath を設定する必要があります
  // basePath: "/UtatanPortal", // あなたのリポジトリ名に置き換えてください
};

module.exports = nextConfig;