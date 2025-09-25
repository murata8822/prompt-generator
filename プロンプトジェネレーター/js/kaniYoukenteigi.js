/*
  ファイル名: kaniYoukenteigi.js
  説明: 入力を集めて要件定義プロンプトを生成するロジック。
  目的: ボタンクリックでデータをまとめ、コピーやクリアなどの操作を行う。
*/

// ID取得の短縮関数
const $ = id => document.getElementById(id);

// 管理する入力IDのリスト
const formIDs = [
  'category','functions','goal','target','platform',
  'technologies','hardware','skills','ui','schedule','etc'
];

// 出力欄
const output = $('output');

// ボタンクリックの動作設定
function onClick(element, handler){
  element.addEventListener('click', handler);
}

// クリップボードコピー（Clipboard API）
async function copyTextToClipboard(text){
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.error('クリップボードにコピーできませんでした', e);
  }
}

// 各ボタンに機能を割り当て
onClick($('genBtn'), () => { output.value = makePrompt(readInputs()); });
onClick($('copyBtn'), () => { if(output.value) copyTextToClipboard(output.value); });
onClick($('clearBtn'), () => { formIDs.forEach(id => $(id).value=''); output.value=''; });

// 入力値を読み取る
function readInputs(){
  const v = id => $(id).value.trim();
  return {
    category:v('category'), functions:v('functions'), goal:v('goal'), target:v('target'),
    platform:v('platform'), technologies:v('technologies'), hardware:v('hardware'), skills:v('skills'),
    ui:v('ui'), schedule:v('schedule'), etc:v('etc')
  };
}

// 入力が空だった時の表示
const noValue = () => '未定';

// プロンプト生成
function makePrompt(data){
  return `## 目的
あなたは最新の知識を持つエンジニアのアシスタントです。以下の情報をもとに、
初心者でも取り組みやすい開発手順を提案してください。

---
## アプリ概要
1. **アプリのジャンル**: ${data.category || noValue()}
2. **メイン機能**: ${data.functions || noValue()}
3. **制作目的**: ${data.goal || noValue()}
4. **ターゲット**: ${data.target || noValue()}
5. **プラットフォーム**: ${data.platform || noValue()}
6. **使いたい言語・技術・サービス**: ${data.technologies || noValue()}
7. **ハードウェア**: ${data.hardware || noValue()}
8. **スキル・学習情報**: ${data.skills || noValue()}
9. **UI**: ${data.ui || noValue()}
10. **スケジュール**: ${data.schedule || noValue()}
11. **制約・その他**: ${data.etc || noValue()}

---
## 指示
- このアプリを実装する**難易度・コスト・おおよその作業時間**を簡潔に示してください。
- 多機能になりそうな場合は、まず **MVP**（最小限の動作確認ができるバージョン）を作り、その後追加機能を提案してください。
- 推奨される**ツール・サービス・ライブラリ**を具体的に挙げ、選んだ理由を一言添えてください。
- 不明点があれば、初心者でも答えやすい短い質問として列挙してください。
- 実装手順は**番号付きリスト**で示してください。
- 最後に「このあと着手すべき最初のステップ」を1文で示してください。`;
}
