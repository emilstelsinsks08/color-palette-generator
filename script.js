function generatePalette() {
  const palette = document.getElementById('palette');
  palette.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = color;
    box.title = color;
    box.onclick = () => navigator.clipboard.writeText(color);
    palette.appendChild(box);
  }
}
