const buttons = document.querySelectorAll('.mode-button');
const grid = [
  [0, 1, 2, 3] // Eine Zeile von 4 Buttons
];
let selectedRow = 0;
let selectedCol = 0;

// Diese Funktion sorgt dafür, dass der aktuell ausgewählte Button visuell hervorgehoben wird
function updateSelection() {
  buttons.forEach(btn => btn.classList.remove('selected'));
  const index = grid[selectedRow][selectedCol];
  buttons[index].classList.add('selected');
}

// Hilfsfunktion, die den Wert innerhalb eines bestimmten Bereichs begrenzt
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (e.key.startsWith('Arrow')) {
    e.preventDefault();
  }

  if (key === 'a' || key === 'arrowleft') {
    // Wählt den Button links aus (wird auf Index 0 bis 3 begrenzt)
    selectedCol = clamp(selectedCol - 1, 0, grid[selectedRow].length - 1);
  } else if (key === 'd' || key === 'arrowright') {
    // Wählt den Button rechts aus (wird auf Index 0 bis 3 begrenzt)
    selectedCol = clamp(selectedCol + 1, 0, grid[selectedRow].length - 1);
  } else if (key === 'b' || key === 'enter') {
    const index = grid[selectedRow][selectedCol];
    const url = buttons[index].getAttribute('data-url');
    window.location.href = url;
  }

  updateSelection();
});

// Initiale Auswahl wird gesetzt
updateSelection();
