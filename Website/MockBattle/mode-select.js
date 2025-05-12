const buttons = document.querySelectorAll('.mode-button');
    const grid = [
      [0, 1],
      [2, 3]
    ];
    let selectedRow = 0;
    let selectedCol = 0;

    function updateSelection() {
      buttons.forEach(btn => btn.classList.remove('selected'));
      const index = grid[selectedRow][selectedCol];
      buttons[index].classList.add('selected');
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
      }
      if (key === 'w' || key === 'arrowup') selectedRow = clamp(selectedRow - 1, 0, 1);
      else if (key === 's' || key === 'arrowdown') selectedRow = clamp(selectedRow + 1, 0, 1);
      else if (key === 'a' || key === 'arrowleft') selectedCol = clamp(selectedCol - 1, 0, 1);
      else if (key === 'd' || key === 'arrowright') selectedCol = clamp(selectedCol + 1, 0, 1);
      else if (key === 'b' || key === 'enter') {
        const index = grid[selectedRow][selectedCol];
        const url = buttons[index].getAttribute('data-url');
        window.location.href = url;
      }
      updateSelection();
    });

    updateSelection();