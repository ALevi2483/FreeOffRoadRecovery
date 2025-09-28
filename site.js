// Build a consistent header + drawer menu on every page
document.addEventListener('DOMContentLoaded', () => {
  // --- One-time redirect: old /home.html -> root ---
  if (location.pathname.toLowerCase().endsWith('/home.html')) {
    location.replace('/');
    return;
  }

  // --- YOUR MENU LINKS (use / for Home) ---
  const links = [
    { href: '/',             label: 'Home' },
    { href: '/find.html',    label: 'Find Volunteers' },
    { href: '/volunteer.html', label: 'Become a Volunteer' },
    { href: '/faq.html',     label: 'FAQ' },
    { href: '/contact.html', label: 'Contact' }
  ];

  // --- Insert header at top if missing ---
  if (!document.querySelector('.site-header')) {
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-wrap">
        <a class="brand" href="/" aria-label="Free Off-Road Recovery home">
          <span class="brand-badge" aria-hidden="true"></span>
          <span>Free Off-Road Recovery</span>
        </a>
        <button class="menu-btn" aria-label="Open menu" id="menuBtn" aria-expanded="false">☰ Menu</button>
      </div>
    `;
    document.body.prepend(header);
  }

  // --- Build overlay + drawer once ---
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

    // --- Add links & active state ---
    const navLinks = drawer.querySelector('#navLinks');

    const normalize = (p) => {
      if (!p) return '/';
      const low = p.toLowerCase().replace(/\/+$/, '');
      if (low === '' || low === '/') return '/';
      if (low.endsWith('/index.html')) return '/';
      if (low.endsWith('/home.html')) return '/';
      return low;
    };

    const current = normalize(location.pathname);

    links.forEach(l => {
      const a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;

      const target = normalize(l.href);
      if (target === current) a.classList.add('active');

      navLinks.appendChild(a);
    });

    // --- Open/close handlers with a11y tweaks ---
    const html = document.documentElement;
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('navClose');

    const open = () => {
      html.classList.add('nav-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      html.classList.remove('nav-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    };

    menuBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', close);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
});
