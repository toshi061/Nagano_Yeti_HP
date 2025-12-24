/**
 * 長野県ハンドボールクラブ - ナビゲーション制御
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========== ハンバーガーメニュー ==========
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');

      // body のスクロールを制御
      if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // ナビゲーションリンククリック時にメニューを閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ========== アクティブページのハイライト ==========
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  // まず既存のactiveクラスを維持（HTMLで既に設定されている場合）
  const hasActiveLink = Array.from(navLinks).some(link => link.classList.contains('active'));

  // HTMLでactiveが設定されていない場合のみ、JavaScriptで判定
  if (!hasActiveLink) {
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');

      // ルートのindex.htmlの判定（サブディレクトリ内ではない場合のみ）
      if ((currentPage === 'index.html' || currentPage === '') &&
          !currentPath.includes('/team/') &&
          !currentPath.includes('/schedule/') &&
          !currentPath.includes('/news/') &&
          !currentPath.includes('/contact/') &&
          !currentPath.includes('/sponsors/')) {
        if (linkPath === 'index.html' || linkPath === './' || linkPath === '/') {
          link.classList.add('active');
        }
      }
    });
  }

  // ========== スクロール時のヘッダー処理 ==========
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロール時に影を濃くする
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = '0 4px 12px rgba(0,188,212,0.15)';
    }

    lastScroll = currentScroll;
  });
});
