# データ管理ガイド

このフォルダには、選手、スタッフ、ニュースのデータが個別のJSONファイルとして保存されています。

## 📁 フォルダ構造

```
data/
├── players/     # 選手データ
├── staff/       # スタッフデータ
├── news/        # ニュース記事データ
└── README.md    # このファイル
```

## 選手データの追加・編集

### 新しい選手を追加する

1. `data/players/` フォルダに新しいJSONファイルを作成
2. ファイル名: `{名前}-{姓}.json` (例: `yamada-taro.json`)
3. 以下の形式でデータを記入:

```json
{
  "id": "yamada-taro",
  "number": 7,
  "name": "山田 太郎",
  "position": "RW",
  "height": "185cm",
  "weight": "77kg",
  "hometown": "長野市"
}
```

4. `js/data-loader.js` の `loadPlayers()` 関数内の `playerFiles` 配列にファイル名（拡張子なし）を追加

### ポジション一覧
- `GK`: ゴールキーパー
- `LW`: レフトウィング
- `LB`: レフトバック
- `CB`: センターバック
- `RB`: ライトバック
- `RW`: ライトウィング
- `PV`: ピボット

### 既存の選手情報を編集する

該当する選手のJSONファイルを開いて、値を変更するだけです。

## スタッフデータの追加・編集

### 新しいスタッフを追加する

1. `data/staff/` フォルダに新しいJSONファイルを作成
2. ファイル名: `{名前}-{姓}.json` (例: `tanaka-hanako.json`)
3. 以下の形式でデータを記入:

```json
{
  "id": "tanaka-hanako",
  "name": "田中 花子",
  "role": "アシスタントコーチ",
  "description": "10年以上のハンドボール指導経験を持つ。ディフェンス戦術を担当。"
}
```

4. `js/data-loader.js` の `loadStaff()` 関数内の `staffFiles` 配列にファイル名（拡張子なし）を追加

## ニュース記事の追加・編集

### 新しいニュースを追加する

1. `data/news/` フォルダに新しいJSONファイルを作成
2. ファイル名: `YYYY-MM-DD-タイトル.json` (例: `2025-12-25-christmas-event.json`)
3. 以下の形式でデータを記入:

```json
{
  "id": "2025-12-25-christmas-event",
  "date": "2025.12.25",
  "category": "event",
  "badge": "イベント",
  "badgeClass": "badge-success",
  "icon": "🎄",
  "title": "クリスマスイベント開催",
  "excerpt": "12月25日にクリスマスイベントを開催します。詳細は後日お知らせします。",
  "categoryLabel": "イベント",
  "link": "article.html"
}
```

4. `js/data-loader.js` の `loadNews()` 関数内の `newsFiles` 配列の **先頭** にファイル名（拡張子なし）を追加（新しい記事を上に表示するため）

### カテゴリーとバッジの組み合わせ

| category | badge | badgeClass | アイコン例 |
|----------|-------|------------|-----------|
| match | 試合 | badge-secondary | 🏆 📊 🔥 |
| team | チーム | badge-warning | 👕 ⭐ 🎂 |
| event | イベント | badge-success | 🎉 🏫 |
| news | お知らせ | badge-info | 📢 📅 |

### アイコン（絵文字）の選び方

記事の内容に合った絵文字を選んでください:
- 試合: 🏆 📊 🔥 ⚡
- チーム: 👕 ⭐ 🎂 👥
- イベント: 🎉 🏫 🎓 🎊
- お知らせ: 📢 📅 📝 💡

## 注意事項

1. **JSONの形式を守る**: カンマやクォートの位置に注意
2. **日本語の扱い**: UTF-8で保存すること
3. **ファイル名**: 半角英数字とハイフンのみ使用
4. **data-loader.jsの更新**: 新しいファイルを追加した際は必ず配列に追加

## トラブルシューティング

### ページに表示されない場合

1. JSONファイルの形式が正しいか確認
2. `js/data-loader.js` の配列にファイル名を追加したか確認
3. ブラウザのコンソールでエラーをチェック
4. ファイル名に拡張子（.json）が正しく付いているか確認

### JSONの構文エラーチェック

オンラインツールでJSONの構文をチェックできます:
- https://jsonlint.com/

## 例: 選手を削除する

1. `data/players/` フォルダから該当のJSONファイルを削除
2. `js/data-loader.js` の `playerFiles` 配列から該当のファイル名を削除
3. ページを更新すると、その選手が表示されなくなります
