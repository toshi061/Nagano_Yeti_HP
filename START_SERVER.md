# ローカルサーバーの起動方法

動的データ読み込みを使用するため、ローカルサーバーを起動する必要があります。

## 方法1: Python（推奨）

### Python 3の場合
```bash
python -m http.server 8000
```

### Python 2の場合
```bash
python -m SimpleHTTPServer 8000
```

ブラウザで `http://localhost:8000` にアクセス

## 方法2: Node.js

### http-serverをインストール
```bash
npm install -g http-server
```

### サーバー起動
```bash
http-server -p 8000
```

ブラウザで `http://localhost:8000` にアクセス

## 方法3: VSCode拡張機能

1. VSCodeで「Live Server」拡張機能をインストール
2. index.htmlを右クリック → "Open with Live Server"
3. 自動的にブラウザが開きます

## 方法4: PHPの場合

```bash
php -S localhost:8000
```

ブラウザで `http://localhost:8000` にアクセス

## 注意事項

- file:// プロトコル（HTMLファイルを直接開く）では動的読み込みが動作しません
- 必ずHTTPサーバー経由でアクセスしてください
- ポート8000が使用中の場合は、別のポート番号（例：8080, 3000など）を使用してください
