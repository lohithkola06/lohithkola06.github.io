// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
  
  // Dashboard navigation scroll
  document.querySelectorAll(".dashboard nav a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
  
  // Gallery slideshow with arrows
  const galleryImages = [
    "images/gallery/image1.jpg",
    "images/gallery/image2.jpg",
    "images/gallery/image3.jpg",
    "images/gallery/image4.jpg",
    "images/gallery/image5.jpg",
    "images/gallery/image6.jpg",
    "images/gallery/image11.jpg",
    "images/gallery/image14.jpg",
    "images/gallery/image15.jpg"
  ];
  let currentSlide = 0;
  
  const slideshow = document.getElementById("slideshow");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  function updateSlide() {
    slideshow.src = galleryImages[currentSlide];
  }
  
  prevBtn.onclick = () => {
    currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
    updateSlide();
  };
  
  nextBtn.onclick = () => {
    currentSlide = (currentSlide + 1) % galleryImages.length;
    updateSlide();
  };
  
  setInterval(() => {
    currentSlide = (currentSlide + 1) % galleryImages.length;
    updateSlide();
  }, 5000);
  
  // Text Analyzer
  function analyzeText() {
    const text = document.getElementById("longText").value;
    const output = document.getElementById("analysisOutput");
  
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const spaceCount = (text.match(/ /g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  
    output.textContent = `
  Letters: ${letterCount}
  Words: ${wordCount}
  Spaces: ${spaceCount}
  Newlines: ${newlineCount}
  Special Characters: ${specialCount}
    `;
  }
  