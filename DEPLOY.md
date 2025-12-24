# GitHub Pages へのデプロイ方法

## 初回設定

1. GitHubリポジトリにプッシュ
```bash
git add .
git commit -m "Add dynamic data loading"
git push origin main
```

2. GitHubのリポジトリページで設定
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main" / "root" を選択
   - Save

3. 数分待つと、公開URLが表示されます
   - 例: `https://ユーザー名.github.io/リポジトリ名/`

## 更新方法

データを追加・編集したら：

```bash
# 1. 新しいJSONファイルを data/ フォルダに追加
# 2. js/data-loader.js の配列にファイル名を追加
# 3. コミット＆プッシュ
git add .
git commit -m "Add new player/news"
git push origin main
```

数分後に自動的に反映されます。

## ローカルで確認する場合

開発中にローカルで確認したい場合のみ、ローカルサーバーが必要です。

### 簡単な方法（Python）
```bash
# このフォルダで実行
python -m http.server 8000

# ブラウザで開く
# http://localhost:8000
```

### VSCode の場合
1. "Live Server" 拡張機能をインストール
2. index.html を右クリック → "Open with Live Server"

## トラブルシューティング

### GitHub Pagesで404エラーが出る場合
- リポジトリがpublicになっているか確認
- Settings → Pages で正しいブランチが選択されているか確認

### データが表示されない場合
- ブラウザのコンソール（F12）でエラーを確認
- JSONファイルの構文エラーをチェック（https://jsonlint.com/）
- js/data-loader.js の配列にファイル名が追加されているか確認
