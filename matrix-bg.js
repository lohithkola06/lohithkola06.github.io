// Matrix-style binary rain background animation
// Uses your site's blue color palette for a modern effect

(function() {
  // Only run once
  if (document.getElementById('matrix-bg-canvas')) return;

  // Setup canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-bg-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '0';
  canvas.style.opacity = '0.32';
  canvas.style.pointerEvents = 'none';
  canvas.style.transition = 'opacity 0.3s';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Responsive sizing
  let width = window.innerWidth;
  let height = window.innerHeight;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  // Color palette
  const colors = [
    getComputedStyle(document.documentElement).getPropertyValue('--light-blue').trim() || '#00A6FB',
    getComputedStyle(document.documentElement).getPropertyValue('--medium-blue').trim() || '#0582CA',
    getComputedStyle(document.documentElement).getPropertyValue('--dark-blue').trim() || '#006494'
  ];

  // Matrix setup
  const fontSize = Math.max(16, Math.floor(width / 48));
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  // Draw loop
  let frame = 0;
  function draw() {
    ctx.fillStyle = 'rgba(5,25,35,0.25)'; // More opaque trail
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px 'Fira Mono', 'Consolas', monospace`;
    ctx.textAlign = 'center';
    // Only update drops every 2nd frame for slower effect
    if (frame % 2 === 0) {
      for (let i = 0; i < columns; i++) {
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = colors[i % colors.length] + '99'; // more visible
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * fontSize + fontSize / 2, drops[i] * fontSize);
        // Reset drop randomly or if out of view
        if (drops[i] * fontSize > height && Math.random() > 0.94) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    } else {
      // Draw current state for smoothness
      for (let i = 0; i < columns; i++) {
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = colors[i % colors.length] + '99'; // more visible
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * fontSize + fontSize / 2, drops[i] * fontSize);
      }
    }
    ctx.shadowBlur = 0;
    frame++;
    requestAnimationFrame(draw);
  }
  draw();
})();
