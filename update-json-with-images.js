// Node.jsで実行: node update-json-with-images.js
const fs = require('fs');
const path = require('path');

// 選手データに画像フィールドを追加
const playersDir = './data/players';
const playerFiles = fs.readdirSync(playersDir);

playerFiles.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(playersDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // 画像フィールドがない場合は追加
    if (!data.image) {
      // ファイル名から拡張子を除いた部分を画像名として使用
      const imageFileName = file.replace('.json', '.jpg');
      data.image = imageFileName;

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated: ${file} -> image: ${imageFileName}`);
    }
  }
});

// ニュースデータに画像フィールドを追加
const newsDir = './data/news';
const newsFiles = fs.readdirSync(newsDir);

newsFiles.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(newsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // 画像フィールドがない場合は追加
    if (!data.image) {
      // ファイル名から拡張子を除いた部分を画像名として使用
      const imageFileName = file.replace('.json', '.jpg');
      data.image = imageFileName;

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated: ${file} -> image: ${imageFileName}`);
    }
  }
});

console.log('All files updated!');
