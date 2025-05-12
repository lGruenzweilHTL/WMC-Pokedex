const positions = ["up", "down", "left", "right", "center"];
const gridMap = {
  center: { up: "up", down: "down", left: "left", right: "right" },
  up: { down: "center" },
  down: { up: "center" },
  left: { right: "center" },
  right: { left: "center" }
};

let current = "center";

function updateSelection(newPos) {
  if (!positions.includes(newPos)) return;
  document.querySelectorAll('.button-container').forEach(el => el.classList.remove('selected'));
  document.querySelector(`.button-container[data-pos="${newPos}"]`).classList.add('selected');
  current = newPos;
}

document.addEventListener('keydown', (e) => {
  let direction = null;
  if (e.key === "ArrowUp") direction = "up";
  else if (e.key === "ArrowDown") direction = "down";
  else if (e.key === "ArrowLeft") direction = "left";
  else if (e.key === "ArrowRight") direction = "right";
  else if (e.key === "Enter") {
    const btn = document.querySelector(`.button-container[data-pos="${current}"] button`);
    if (btn) btn.click();
  }

  if (direction && gridMap[current] && gridMap[current][direction]) {
    updateSelection(gridMap[current][direction]);
  }
});

// Optional: Zeige einen Alert bei Button-Klick
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    alert(`Button "${btn.textContent}" gedrückt`);
  });
});
