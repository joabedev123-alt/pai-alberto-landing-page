import './style.css'

// --- Scroll Glow Effect ---
const glow = document.getElementById('scrollGlow');
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  glow.style.transform = `translate(${x}px, ${y}px)`;
});

// --- Reveal Animations on Scroll ---
const revealElements = document.querySelectorAll('[data-reveal]');
const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => revealOnScroll.observe(el));

// --- Counters ---
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerText = Math.floor(progress * (end - start) + start).toLocaleString('pt-BR') + (obj.id === 'count-atendimentos' ? '+' : '+');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Counters logic simplified (if needed in future)


// --- Header Logic ---
const header = document.getElementById('mainHeader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
let lastScroll = 0;

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('ph-list');
    icon.classList.toggle('ph-x');
  });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('ph-list');
    icon.classList.remove('ph-x');
  });
});

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    if (currentScroll > lastScroll) {
      header.classList.add('hidden'); // Scrolling down
    } else {
      header.classList.remove('hidden'); // Scrolling up
    }
    navLinks.classList.remove('active'); // Close menu on scroll
  } else {
    header.classList.remove('hidden');
  }
  
  lastScroll = currentScroll;
});

// --- Video Controls (Authority) ---
const videoAuth = document.getElementById('authVideo');
const playPauseBtnAuth = document.getElementById('playPauseBtn');
const volumeBtnAuth = document.getElementById('volumeBtn');

if (videoAuth && playPauseBtnAuth && volumeBtnAuth) {
  playPauseBtnAuth.addEventListener('click', () => {
    if (videoAuth.paused) {
      videoAuth.play();
      playPauseBtnAuth.innerHTML = '<i class="ph ph-pause"></i>';
    } else {
      videoAuth.pause();
      playPauseBtnAuth.innerHTML = '<i class="ph ph-play"></i>';
    }
  });

  volumeBtnAuth.addEventListener('click', () => {
    videoAuth.muted = !videoAuth.muted;
    if (videoAuth.muted) {
      volumeBtnAuth.innerHTML = '<i class="ph ph-speaker-slash"></i>';
    } else {
      volumeBtnAuth.innerHTML = '<i class="ph ph-speaker-high"></i>';
    }
  });
}

// --- Video Controls (Hero) ---
const videoHero = document.getElementById('heroVideo');
const playPauseBtnHero = document.getElementById('heroPlayPauseBtn');
const volumeBtnHero = document.getElementById('heroVolumeBtn');

if (videoHero && playPauseBtnHero && volumeBtnHero) {
  playPauseBtnHero.addEventListener('click', () => {
    if (videoHero.paused) {
      videoHero.play();
      playPauseBtnHero.innerHTML = '<i class="ph ph-pause"></i>';
    } else {
      videoHero.pause();
      playPauseBtnHero.innerHTML = '<i class="ph ph-play"></i>';
    }
  });

  volumeBtnHero.addEventListener('click', () => {
    videoHero.muted = !videoHero.muted;
    if (videoHero.muted) {
      volumeBtnHero.innerHTML = '<i class="ph ph-speaker-slash"></i>';
    } else {
      volumeBtnHero.innerHTML = '<i class="ph ph-speaker-high"></i>';
    }
  });
}

// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const clickableImages = document.querySelectorAll('.carousel-slide img, .gallery-item img');

clickableImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

const closeLightbox = () => {
  lightbox.style.display = 'none';
};

if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});

// --- Testimonial Videos Autoplay Fix ---
window.addEventListener('load', () => {
  const testimonialVideos = document.querySelectorAll('.carousel-slide video');
  testimonialVideos.forEach(video => {
    video.play().catch(error => {
      console.log("Autoplay prevented for testimonial video, user interaction might be needed:", error);
    });
  });
});

console.log('Pai Alberto de Oxalá Vidência & Magia Landing Page Loaded Successfully');
