let autoRolling = false;
let history = [];
const sound = document.getElementById("success-sound");

function rollOnce() {
  if (autoRolling) return;
  const result = rollDice();
  const isZoro = isZorome(result);

  if (isZoro) {
    document.getElementById("result-message").textContent = `🎉 ゾロ目成功！出目は ${result[0]}！`;
    document.getElementById("result-message").style.color = "green";
    sound.currentTime = 0;
    sound.play();
  } else {
    document.getElementById("result-message").textContent = `出目: ${result.join(", ")}（ゾロ目ではありません）`;
    document.getElementById("result-message").style.color = "black";
  }
}

function startAutoRoll() {
  if (autoRolling) return;
  autoRolling = true;
  document.getElementById("result-message").textContent = "ゾロ目が出るまで振り続けています...";
  document.getElementById("result-message").style.color = "black";

  const interval = setInterval(() => {
    const result = rollDice();
    if (isZorome(result)) {
      clearInterval(interval);
      autoRolling = false;
      sound.currentTime = 0;
      sound.play();
      document.getElementById("result-message").textContent = `🎉 ゾロ目成功！出目は ${result[0]}！`;
      document.getElementById("result-message").style.color = "green";
    }
  }, 200);
}

function rollDice() {
  const container = document.getElementById("dice-container");
  const count = parseInt(document.getElementById("dice-count").value);
  const result = [];
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    result.push(value);

    const dice = document.createElement("div");
    dice.className = "dice";
    dice.textContent = value;
    container.appendChild(dice);
  }

  addToHistory(result);
  return result;
}

function isZorome(arr) {
  return arr.every(val => val === arr[0]);
}

function addToHistory(result) {
  const historyList = document.getElementById("history-list");
  history.unshift(result.join(", "));
  if (history.length > 100) history.pop();

  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}
