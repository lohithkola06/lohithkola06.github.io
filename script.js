// --- Site-wide User Event Logger ---
(function() {
  // Helper to get readable type of element
  function getElementType(el) {
    if (!el) return 'unknown';
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    if (tag === 'img') return 'image';
    if (tag === 'a' && el.href && el.href.endsWith('.pdf')) return 'pdf-link';
    if (tag === 'a') return 'link';
    if (tag === 'button') return 'button';
    if (tag === 'input') return el.type === 'checkbox' || el.type === 'radio' ? el.type : 'input';
    if (tag === 'select') return 'drop-down';
    if (tag === 'textarea') return 'text-area';
    if (tag.match(/^h[1-6]$/)) return 'heading';
    if (tag === 'svg') return 'icon';
    if (tag === 'li') return 'list-item';
    if (tag === 'ul' || tag === 'ol') return 'list';
    if (tag === 'p') return 'paragraph';
    if (tag === 'nav') return 'navbar';
    if (tag === 'footer') return 'footer';
    if (tag === 'main' || tag === 'section') return tag;
    return tag || 'unknown';
  }

  // Log page view
  function logPageView() {
    const ts = new Date().toISOString();
    console.log(`${ts}, view, page`);
  }

  // Log click event
  function logClick(e) {
    const ts = new Date().toISOString();
    let el = e.target;
    let type = getElementType(el);
    // Traverse up to find something meaningful
    let depth = 0;
    while (type === 'unknown' && el.parentElement && depth < 3) {
      el = el.parentElement;
      type = getElementType(el);
      depth++;
    }
    console.log(`${ts}, click, ${type}`);
  }

  document.addEventListener('DOMContentLoaded', logPageView);
  document.addEventListener('click', logClick, true);
})();

// Add Pac-Man background animation
(function() {
  if (!document.querySelector('script[src="matrix-bg.js"]')) {
    var matrixScript = document.createElement('script');
    matrixScript.src = 'matrix-bg.js';
    document.head.appendChild(matrixScript);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Fade in main content (not Pac-Man canvas)
    ['header', 'main', 'footer', '.profile-container', '.about-section', '.where-section', '.skills-section', '.analyzer-section'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('fade-in');
        });
    });

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active from all
            links.forEach(l => l.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
        });
    });
});