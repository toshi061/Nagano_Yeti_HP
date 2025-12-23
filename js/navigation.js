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

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');

    // トップページの判定
    if (currentPage === 'index.html' || currentPage === '') {
      if (linkPath === '../index.html' || linkPath === 'index.html' || linkPath === '/') {
        link.classList.add('active');
      }
    }
    // その他のページの判定
    else if (linkPath && linkPath.includes(currentPage)) {
      link.classList.add('active');
    }
    // ディレクトリベースの判定
    else if (currentPath.includes('/team/') && linkPath && linkPath.includes('/team/')) {
      if (currentPage === 'index.html' && linkPath.includes('team/index.html')) {
        link.classList.add('active');
      }
    }
    else if (currentPath.includes('/schedule/') && linkPath && linkPath.includes('/schedule/')) {
      document.querySelector('a[href*="/schedule/"]')?.classList.add('active');
    }
    else if (currentPath.includes('/news/') && linkPath && linkPath.includes('/news/')) {
      document.querySelector('a[href*="/news/"]')?.classList.add('active');
    }
    else if (currentPath.includes('/access/') && linkPath && linkPath.includes('/access/')) {
      document.querySelector('a[href*="/access/"]')?.classList.add('active');
    }
    else if (currentPath.includes('/contact/') && linkPath && linkPath.includes('/contact/')) {
      document.querySelector('a[href*="/contact/"]')?.classList.add('active');
    }
  });

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
