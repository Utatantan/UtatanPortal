

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Utatan Portal は、記事・論文・SNS・ブックマークなどの情報を一元管理し、自動で更新されるポータルサイトです。

## 機能

- 記事・ツイート・論文をカテゴリごとに一覧表示
- タグやフィルターで検索可能
- モバイル対応のシンプルな UI
- GitHub Actions による自動更新

## システム構成

1. **フロントエンド（表示）**
   - Next.js を使用した静的サイト
   - データは JSON から読み込む
   - モバイル対応のシンプルな UI

2. **データ管理**
   - GitHub の `data/links.json` に情報を保存
   - JSON 形式でタグ付けされたリンク情報を管理

3. **データの更新（自動化）**
   - GitHub Actions を使って定期的に更新
   - RSS から Note / X / Google Scholar の新着を取得
   - 取得データを `data/links.json` に反映

## 開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/utatan-portal.git
cd utatan-portal

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、ポータルサイトが表示されます。

## データの手動更新

GitHub Actions の workflow_dispatch を使って手動でデータを更新することができます：

1. GitHub リポジトリの "Actions" タブを開く
2. "Update Links" ワークフローを選択
3. "Run workflow" ボタンをクリック

## カスタマイズ

RSS フィードの URL を変更するには、`scripts/update_links.py` ファイルの `RSS_FEEDS` 変数を編集してください。

## 使用技術

- フロントエンド: Next.js, React, Tailwind CSS
- データ管理: JSON (GitHub リポジトリ内)
- 自動更新: GitHub Actions
- データ取得: RSS (feedparser)

## ライセンス

<<<<<<< HEAD
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

=======
MIT
>>>>>>> 13fd157 (addfile)
