// データローダー - プレイヤー、スタッフ、ニュースを動的に読み込む

/**
 * 現在のページからdataフォルダへの相対パスを取得
 */
function getDataPath() {
  const path = window.location.pathname;
  // team/index.html, news/index.html, sponsors/index.html の場合
  if (path.includes('/team/') || path.includes('/news/') || path.includes('/sponsors/')) {
    return '../data';
  }
  // index.html の場合
  return './data';
}

/**
 * プレイヤーデータを読み込む
 * @returns {Promise<Array>} プレイヤーの配列
 */
async function loadPlayers() {
  const playerFiles = [
    'suzuki-makoto',
    'nakamura-takashi',
    'takahashi-shota',
    'watanabe-ken',
    'kobayashi-yuki',
    'matsumoto-daisuke',
    'sato-kenta',
    'inoue-takuya',
    'kimura-takuya',
    'yamamoto-ryo',
    'yamada-taro',
    'tanaka-koji',
    'ito-tsubasa',
    'kato-tatsuya'
  ];

  const dataPath = getDataPath();
  const players = [];
  for (const file of playerFiles) {
    try {
      const response = await fetch(`${dataPath}/players/${file}.json`);
      if (response.ok) {
        const player = await response.json();
        players.push(player);
      }
    } catch (error) {
      console.error(`Failed to load player: ${file}`, error);
    }
  }

  // 背番号順にソート
  players.sort((a, b) => a.number - b.number);
  return players;
}

/**
 * スタッフデータを読み込む
 * @returns {Promise<Array>} スタッフの配列
 */
async function loadStaff() {
  const staffFiles = [
    'nakajima-kenichi',
    'harada-hiroyuki',
    'saito-misaki'
  ];

  const dataPath = getDataPath();
  const staff = [];
  for (const file of staffFiles) {
    try {
      const response = await fetch(`${dataPath}/staff/${file}.json`);
      if (response.ok) {
        const staffMember = await response.json();
        staff.push(staffMember);
      }
    } catch (error) {
      console.error(`Failed to load staff: ${file}`, error);
    }
  }

  return staff;
}

/**
 * ニュースデータを読み込む
 * @returns {Promise<Array>} ニュース記事の配列
 */
async function loadNews() {
  const newsFiles = [
    '2025-12-15-winter-league-win',
    '2025-12-10-member-recruitment',
    '2025-12-05-handball-experience',
    '2025-11-28-new-uniform',
    '2025-11-20-winter-league-opening',
    '2025-11-15-school-handball-class',
    '2025-11-10-new-players',
    '2025-11-05-new-year-schedule',
    '2025-10-28-autumn-league-final',
    '2025-10-20-15th-anniversary'
  ];

  const dataPath = getDataPath();
  const news = [];
  for (const file of newsFiles) {
    try {
      const response = await fetch(`${dataPath}/news/${file}.json`);
      if (response.ok) {
        const article = await response.json();
        news.push(article);
      }
    } catch (error) {
      console.error(`Failed to load news: ${file}`, error);
    }
  }

  return news;
}

/**
 * プレイヤーカードHTMLを生成
 * @param {Object} player プレイヤーデータ
 * @returns {string} HTMLマークアップ
 */
function createPlayerCardHTML(player) {
  const dataPath = getDataPath();
  // 画像のパス: dataPathから一つ上の階層のimages/playersフォルダ
  const imagePath = player.image
    ? `${dataPath}/../images/players/${player.image}`
    : '';

  return `
    <div class="player-card-full" data-position="${player.position}">
      <div class="player-image-full" ${imagePath ? `style="background-image: url('${imagePath}')"` : ''}>
        <div class="player-number-full">${player.number}</div>
        <div class="player-position-badge">${player.position}</div>
      </div>
      <div class="player-info-full">
        <h3 class="player-name-full">${player.name}</h3>
        <div class="player-details">
          <div class="detail-item">
            <span class="detail-label">背番号</span>
            <span class="detail-value">${player.number}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">ポジション</span>
            <span class="detail-value">${player.position}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">身長</span>
            <span class="detail-value">${player.height}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">体重</span>
            <span class="detail-value">${player.weight}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">出身地</span>
            <span class="detail-value">${player.hometown}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * スタッフカードHTMLを生成
 * @param {Object} staff スタッフデータ
 * @returns {string} HTMLマークアップ
 */
function createStaffCardHTML(staff) {
  const dataPath = getDataPath();
  const imagePath = staff.image
    ? `${dataPath}/../images/staff/${staff.image}`
    : '';

  return `
    <div class="staff-card">
      <div class="staff-image" ${imagePath ? `style="background-image: url('${imagePath}'); background-size: cover; background-position: center;"` : ''}>
        ${!imagePath ? '<div class="staff-icon">👤</div>' : ''}
      </div>
      <div class="staff-info">
        <h3 class="staff-name">${staff.name}</h3>
        <p class="staff-role">${staff.role}</p>
        <p class="staff-description">${staff.description}</p>
      </div>
    </div>
  `;
}

/**
 * ニュース記事HTMLを生成
 * @param {Object} article ニュース記事データ
 * @returns {string} HTMLマークアップ
 */
function createNewsArticleHTML(article) {
  const dataPath = getDataPath();
  // 画像のパス
  const imagePath = article.image
    ? `${dataPath}/../images/news/${article.image}`
    : '';

  return `
    <article class="news-article" data-category="${article.category}">
      <div class="article-image" ${imagePath ? `style="background-image: url('${imagePath}'); background-size: cover; background-position: center;"` : ''}>
        ${!imagePath ? `<div class="article-placeholder">${article.icon}</div>` : ''}
        <span class="article-badge ${article.badgeClass}">${article.badge}</span>
      </div>
      <div class="article-content">
        <time class="article-date">${article.date}</time>
        <h2 class="article-title">
          <a href="${article.link}">${article.title}</a>
        </h2>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-footer">
          <span class="article-category">${article.categoryLabel}</span>
          <a href="${article.link}" class="article-link">続きを読む →</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * トップページ用のシンプルなニュースカードHTMLを生成
 * @param {Object} article ニュース記事データ
 * @returns {string} HTMLマークアップ
 */
function createSimpleNewsCardHTML(article) {
  return `
    <a href="news/${article.link}" class="news-card">
      <div class="news-icon">${article.icon}</div>
      <div class="news-content">
        <time class="news-date">${article.date}</time>
        <h3 class="news-title">${article.title}</h3>
        <p class="news-text">${article.excerpt}</p>
      </div>
    </a>
  `;
}

/**
 * スポンサーデータを読み込む
 * @returns {Promise<Array>} スポンサーの配列
 */
async function loadSponsors() {
  const sponsorFiles = [
    'nagano-sports',
    'shinshu-construction',
    'nagano-daiichi-bank',
    'shinshu-foods',
    'nagano-automobile',
    'nagano-medical-clinic',
    'shinshu-printing',
    'nagano-real-estate',
    'shinshu-hotel',
    'nagano-advertising',
    'shinshu-it'
  ];

  const dataPath = getDataPath();
  const sponsors = [];
  for (const file of sponsorFiles) {
    try {
      const response = await fetch(`${dataPath}/sponsors/${file}.json`);
      if (response.ok) {
        const sponsor = await response.json();
        sponsors.push(sponsor);
      }
    } catch (error) {
      console.error(`Failed to load sponsor: ${file}`, error);
    }
  }

  return sponsors;
}

/**
 * スポンサーカードHTMLを生成
 * @param {Object} sponsor スポンサーデータ
 * @returns {string} HTMLマークアップ
 */
function createSponsorCardHTML(sponsor) {
  const dataPath = getDataPath();
  const imagePath = sponsor.image
    ? `${dataPath}/../images/sponsors/${sponsor.image}`
    : '';

  // tierに応じたクラス名
  const tierClass = sponsor.tier; // gold, silver, bronze

  // ゴールド・シルバーは大きいカード、ブロンズは小さいカード
  if (sponsor.tier === 'bronze') {
    return `
      <div class="sponsor-card ${tierClass}">
        <div class="sponsor-logo small" ${imagePath ? `style="background-image: url('${imagePath}'); background-size: contain; background-repeat: no-repeat; background-position: center;"` : ''}>
          ${!imagePath ? '<div class="logo-placeholder">LOGO</div>' : ''}
        </div>
        <div class="sponsor-info">
          <h3 class="sponsor-name">${sponsor.name}</h3>
          <p class="sponsor-category">${sponsor.category}</p>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="sponsor-card ${tierClass}">
        <div class="sponsor-logo" ${imagePath ? `style="background-image: url('${imagePath}'); background-size: contain; background-repeat: no-repeat; background-position: center;"` : ''}>
          ${!imagePath ? '<div class="logo-placeholder">LOGO</div>' : ''}
        </div>
        <div class="sponsor-info">
          <h3 class="sponsor-name">${sponsor.name}</h3>
          <p class="sponsor-category">${sponsor.category}</p>
          <p class="sponsor-description">${sponsor.description}</p>
          <a href="${sponsor.website}" class="sponsor-website">ウェブサイト →</a>
        </div>
      </div>
    `;
  }
}
