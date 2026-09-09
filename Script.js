// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animRing);
}
animRing();

// NAVBAR SCROLL LOGIC
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navLogo = document.getElementById('navLogo');
const shopSection = document.getElementById('shop');

function updateNav() {
  if (!navbar || !navLinks || !shopSection) return;
  const scrollY = window.scrollY;
  const shopTop = shopSection.offsetTop;

  if (scrollY >= shopTop - 80) {
    navbar.classList.remove('transparent');
    navbar.classList.add('solid');
    navLinks.innerHTML = `
      <li><a href="About.html">About</a></li>
      <li><a href="Shop.html">Shop</a></li>
      <li><a href="Index.html#interactivo">Interactivo</a></li>
      <li><a href="Index.html#footer">Social</a></li>
    `;
  } else {
    navbar.classList.remove('solid');
    navbar.classList.add('transparent');
    navLinks.innerHTML = `
      <li><a href="About.html">About</a></li>
      <li><a href="Index.html">Libera Studio</a></li>
      <li><a href="Index.html#interactivo">Interactivo</a></li>
    `;
  }
}
window.addEventListener('scroll', updateNav);
updateNav();

// POPUP
const imgSrcMap = {
  'buso': 'Images/Buso.png',
  'camiseta': 'Images/camiseta.png',
  'totebags': 'Images/Totebags.png'
};
function openPopup(name, price, imgKey) {
  const overlay = document.getElementById('popupOverlay');
  const nameEl = document.getElementById('popupName');
  const priceEl = document.getElementById('popupPrice');
  const imgEl = document.getElementById('popupImg');
  if (!overlay || !nameEl || !priceEl || !imgEl) return;
  document.getElementById('popupName').textContent = name;
  document.getElementById('popupPrice').textContent = price;
  document.getElementById('popupImg').src = imgSrcMap[imgKey] || '';
  document.getElementById('popupOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup(e) {
  if (e.target === document.getElementById('popupOverlay')) closePopupDirect();
}
function closePopupDirect() {
  const overlay = document.getElementById('popupOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// CARD click opens popup
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.dataset.name;
    const price = card.dataset.price;
    const img = card.dataset.img;
    openPopup(name, price, img);
  });
});

// SHOP FILTER (Shop.html)
const shopFilterMenu = document.querySelector('[data-shop-filter-menu]');
const shopGrid = document.querySelector('[data-shop-grid]');
if (shopFilterMenu && shopGrid) {
  const buttons = shopFilterMenu.querySelectorAll('[data-filter]');
  const items = shopGrid.querySelectorAll('[data-category]');

  function applyFilter(filter) {
    items.forEach(item => {
      const cat = (item.getAttribute('data-category') || '').toLowerCase();
      const show = filter === 'all' ? true : cat === filter;
      item.style.display = show ? '' : 'none';
    });
    buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-filter') === filter));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.getAttribute('data-filter') || 'all'));
  });

  applyFilter('all');
}