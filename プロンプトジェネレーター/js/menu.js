/*
  ファイル名: menu.js
  役目: サイドメニューを開閉する動きを担当
  備考: 矢印ボタンを押すとクラスを切り替えて、
        CSSの見た目を変えている
*/

// ページが読み込まれたら動作をセット
window.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");       // メニュー本体
  const toggleBtn = document.getElementById("toggleBtn"); // 矢印ボタン
  const content = document.getElementById("content"); // 本文エリア

  // 要素が存在するときだけ動作を設定
  if (menu && toggleBtn && content) {
    toggleBtn.addEventListener("click", () => {
      // メニューとコンテンツの状態を切り替える
      menu.classList.toggle("collapsed");
      content.classList.toggle("collapsed");

      // ボタンの矢印を変える（→ / ←）
      toggleBtn.textContent = menu.classList.contains("collapsed") ? "→" : "←";
    });
  }
});
