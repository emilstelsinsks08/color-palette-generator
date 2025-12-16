// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCxY-2RITxeDh_BPTw3wI3CTPDGV4VXoX8",
  authDomain: "color-palette-db.firebaseapp.com",
  databaseURL: "https://color-palette-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "color-palette-db",
  storageBucket: "color-palette-db.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const palettesRef = db.ref('palettes');

function generatePalette() {
  const palette = document.getElementById('palette');
  palette.innerHTML = '';
  window.currentColors = [];
  for (let i = 0; i < 5; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    window.currentColors.push(color);
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = color;
    box.title = color;
    box.onclick = () => navigator.clipboard.writeText(color);
    palette.appendChild(box);
  }
}

function savePalette() {
  if (!window.currentColors || window.currentColors.length === 0) {
    alert("Vispirms ģenerē paleti!");
    return;
  }
  palettesRef.push({ colors: window.currentColors, timestamp: Date.now() });
  alert("Palete saglabāta!");
}

// Attēlojam saglabātās
palettesRef.on('value', snap => {
  const container = document.getElementById('saved-palettes');
  container.innerHTML = '';
  snap.forEach(child => {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.margin = '6px';
    child.val().colors.forEach(c => {
      const box = document.createElement('div');
      box.className = 'color-box';
      box.style.backgroundColor = c;
      wrap.appendChild(box);
    });
    container.appendChild(wrap);
  });
});
