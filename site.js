// Build a consistent header + drawer menu on every page
document.addEventListener('DOMContentLoaded', () => {
  // === YOUR MENU LINKS ===
  const links = [
    { href: '/home.html',      label: 'Home' },
    { href: '/find.html',      label: 'Find Volunteers' },
    { href: '/volunteer.html', label: 'Become a Volunteer' },
    { href: '/FAQ.html',       label: 'FAQ' },
    { href: '/Contact.html',   label: 'Contact' }
  ];

  // Insert header at top of body (if not already present)
  if (!document.querySelector('.site-header')) {
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-wrap">
        <a class="brand" href="/home.html">
          <span class="brand-badge" aria-hidden="true"></span>
          <span>Free Off-Road Recovery</span>
        </a>
        <button class="menu-btn" aria-label="Open menu" id="menuBtn">☰ Menu</button>
      </div>
    `;
    document.body.prepend(header);
  }

  // Build overlay + drawer once
  if (!document.querySelector('.nav-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'navOverlay';

    const drawer = document.createElement('nav');
    drawer.className = 'nav-drawer';
    drawer.setAttribute('aria-label', 'Site navigation');
    drawer.innerHTML = `
      <header>
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="brand-badge" aria-hidden="true"></span>
          <strong>Menu</strong>
        </div>
        <button class="nav-close" id="navClose" aria-label="Close menu">Close</button>
      </header>
      <div class="nav-links" id="navLinks"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // Add links
    const navLinks = drawer.querySelector('#navLinks');
    const path = (location.pathname.replace(/\/+$/, '') || '/').toLowerCase();
    links.forEach(l => {
      const a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;

      // simple active state check (case-insensitive for safety)
      const normalized = (l.href.replace(/\/+$/, '') || '/').toLowerCase();
      if (normalized === path) a.classList.add('active');

      navLinks.appendChild(a);
    });

    // Wire up open/close
    const open = () => document.documentElement.classList.add('nav-open');
    const close = () => document.documentElement.classList.remove('nav-open');

    document.getElementById('menuBtn')?.addEventListener('click', open);
    document.getElementById('navClose')?.addEventListener('click', close);
    overlay.addEventListener('click', close);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
});