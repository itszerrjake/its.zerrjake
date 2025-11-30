// Smooth scroll when clicking nav items (native CSS also handles it)
if ('scrollBehavior' in document.documentElement.style) {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// Reveal elements when they enter viewport: IntersectionObserver
const revealItems = document.querySelectorAll('.reveal-on-scroll');
if (window.IntersectionObserver && revealItems.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(el => io.observe(el));
} else {
  // Fallback: add class immediately
  revealItems.forEach(el => el.classList.add('in-view'));
}

// Lightbox modal for gallery images
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('figcaption');
const galleryGrid = document.querySelector('.gallery-grid');

function openLightbox(src, alt, caption) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxCaption.textContent = caption || alt || '';
  // Reset any transforms and ensure the image will fit inside the dialog
  lightboxImg.style.maxWidth = '100%';
  lightboxImg.style.maxHeight = '100%';
  lightboxImg.style.width = 'auto';
  lightboxImg.style.height = 'auto';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
}

// click handler
galleryGrid?.addEventListener('click', (e) => {
  const fig = e.target.closest('figure.gallery-item');
  if (!fig) return;
  const img = fig.querySelector('img');
  if (!img) return;
  openLightbox(img.src, img.alt, fig.querySelector('figcaption')?.textContent);
});

// Open profile photo in lightbox when clicked
const headerProfile = document.querySelector('.profile-link img');
headerProfile?.addEventListener('click', (e) => {
  e.preventDefault();
  const src = headerProfile.getAttribute('src');
  const alt = headerProfile.getAttribute('alt') || 'Profile photo';
  openLightbox(src, alt, 'Profile');
});

// keyboard accessibility
galleryGrid?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const fig = e.target.closest('figure.gallery-item');
    if (!fig) return;
    const img = fig.querySelector('img');
    openLightbox(img.src, img.alt, fig.querySelector('figcaption')?.textContent);
    e.preventDefault();
  }
});

// close handlers
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.closest('.lightbox-close')) {
    closeLightbox();
  }
});

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Active nav link switching (simple on scroll)
const navLinks = document.querySelectorAll('.site-nav a, .sidebar-nav a');
const sections = Array.from(navLinks).map(link => {
  // Get fragment/hash from the link (e.g., #about or index.html#about)
  try {
    const hash = new URL(link.getAttribute('href'), location.href).hash;
    return hash ? document.querySelector(hash) : null;
  } catch (e) {
    return null;
  }
}).filter(Boolean);

function onScroll() {
  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
  const scrollPos = window.scrollY + headerH + 20; // consider header offset when deciding active section
  let currentIndex = 0;
  sections.forEach((section, index) => {
    const top = section.offsetTop;
    if (top <= scrollPos) {
      currentIndex = index;
    }
  });
  navLinks.forEach((link, i) => {
    const isActive = i === currentIndex;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
// initial highlight
onScroll();

// If no sections detected (like when viewing a separate page), highlight link for current page
if (!sections.length) {
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isCurrent = href.includes(currentFile) || (currentFile === 'index.html' && href.includes('#home')) || (href === 'index.html' && currentFile === 'index.html');
    link.classList.toggle('active', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}

// Add small sidebar scrolled state for subtle shadow
const sidebar = document.querySelector('.sidebar') || document.querySelector('.site-header');
function updateSidebarOnScroll() {
  if (!sidebar) return;
  sidebar.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', updateSidebarOnScroll, { passive: true });
updateSidebarOnScroll();
