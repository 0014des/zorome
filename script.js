function rollDice() {
  const container = document.getElementById("dice-container");
  const count = parseInt(document.getElementById("dice-count").value);
  const resultMessage = document.getElementById("result-message");

  container.innerHTML = "";
  const results = [];

  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * 6) + 1;
    results.push(roll);

    const dice = document.createElement("div");
    dice.className = "dice";
    dice.textContent = roll;
    container.appendChild(dice);
  }

  const isZorome = results.every(val => val === results[0]);
  if (isZorome) {
    resultMessage.textContent = "🎉 ゾロ目成功！おめでとう！";
    resultMessage.style.color = "green";
  } else {
    resultMessage.textContent = "まだゾロ目じゃないよ。もう一度！";
    resultMessage.style.color = "red";
  }
}
