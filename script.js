// 初期値をlocalStorageから取得、なければ35
let counter = localStorage.getItem('counter') ? Number(localStorage.getItem('counter')) : 35;
let history = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];

const counterDisplay = document.getElementById('counterDisplay');
const minusButton = document.getElementById('minusButton');
const plusButton = document.getElementById('plusButton');
const usernameInput = document.getElementById('username');
const historyDisplay = document.getElementById('history');

// カウントを更新する関数
function updateDisplay() {
    counterDisplay.textContent = counter;
    localStorage.setItem('counter', counter);  // カウントをlocalStorageに保存
}

// 履歴を更新する関数
function updateHistory(action) {
    const username = usernameInput.value.trim() || '匿名';
    const timestamp = new Date().toLocaleString();
    const historyItem = `${username} が ${action} しました (${timestamp})`;

    history.push(historyItem);
    localStorage.setItem('history', JSON.stringify(history));  // 履歴を保存

    displayHistory();  // 履歴を表示
}

// 履歴を表示する関数
function displayHistory() {
    historyDisplay.innerHTML = '';  // 履歴の表示をクリア
    history.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        div.textContent = item;
        historyDisplay.appendChild(div);
    });
}

// マイナスボタンのイベント
minusButton.addEventListener('click', () => {
    counter--;
    updateDisplay();
    updateHistory('減少');
});

// プラスボタンのイベント
plusButton.addEventListener('click', () => {
    counter++;
    updateDisplay();
    updateHistory('増加');
});

// ページ読み込み時にディスプレイと履歴を初期化
updateDisplay();
displayHistory();

