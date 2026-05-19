gsap.registerPlugin(ScrollTrigger, Draggable); // Register Draggable Plugin

// ========================================================
// 0. INIT LENIS
// ========================================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// ========================================================
// 1. HERO FONT SPLITTER & ANIMASI PIN
// ========================================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    const letters = text.split('');
    heroTitle.textContent = '';
    
    letters.forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        if (letter === ' ') span.innerHTML = '&nbsp;'; 
        heroTitle.appendChild(span);
    });
}

const heroTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=100%", 
        scrub: 1,
        pin: true
    }
});

heroTimeline.to(".bg-layer", { scale: 1.1, opacity: 0, ease: "none", force3D: true }, 0);
heroTimeline.to(".mid-layer", { scale: 1.2, rotationZ: 3, opacity: 0, ease: "none", force3D: true }, 0);
heroTimeline.to(".text-layer", { yPercent: -120, opacity: 0, ease: "none", force3D: true }, 0);
heroTimeline.to(".scroll-indicator", { opacity: 0, y: 50, ease: "none", force3D: true }, 0);


// ========================================================
// 2. ANIMASI REVEAL BIOGRAFI
// ========================================================
gsap.from(".bio-left.reveal-left", { 
    x: -40, opacity: 0, duration: 1, ease: "power2.out", force3D: true,
    scrollTrigger: { trigger: "#biografi", start: "top 75%", toggleActions: "play none none reverse" }
});

gsap.from(".bio-block.reveal-bottom", { 
    y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power2.out", force3D: true,
    scrollTrigger: { trigger: "#biografi", start: "top 60%", toggleActions: "play none none reverse" }
});


// ========================================================
// 3. SWIPER GALLERY
// ========================================================
const swiper = new Swiper('.myGallerySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto', 
    loop: true,
    speed: 600, 
    breakpoints: {
        320: { coverflowEffect: { rotate: 20, stretch: 0, depth: 150, modifier: 1, slideShadows: true } },
        768: { coverflowEffect: { rotate: 25, stretch: 10, depth: 250, modifier: 1.2, slideShadows: true } },
        1200: { coverflowEffect: { rotate: 25, stretch: 30, depth: 400, modifier: 1.2, slideShadows: true } }
    }
});

gsap.from(".stats-headline-container, .stats-container", {
    y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out", force3D: true,
    scrollTrigger: { trigger: ".gallery-section", start: "top 70%", toggleActions: "play none none reverse" }
});


// ========================================================
// 4. NAVBAR & MENU CLICK
// ========================================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true }); 

document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href');
        
        if (targetId === '#hero') {
            lenis.scrollTo(0, { duration: 1.2 });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement, { duration: 1.2, offset: -80 });
            }
        }
    });
});


// ========================================================
// 5. TEMPLATE SECTION: HURUF JATUH & DRAGGABLE INTERACTIVE
// ========================================================
const textKata = "EXPLORE"; // Kata yang mau dipecah dan didrag
const dragWrapper = document.getElementById('drag-button-wrapper');

if (dragWrapper) {
    // Pecah kata jadi huruf <span> satu per satu
    textKata.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'drag-letter';
        
        // Kasih rotasi acak dikit biar numpuknya natural estetik
        const randomRot = Math.random() * 20 - 10; 
        gsap.set(span, { rotation: randomRot, zIndex: 100 - i });
        dragWrapper.appendChild(span);
    });

    const dragLetters = document.querySelectorAll('.drag-letter');

    // Animasi Reveal Teks Paragrafnya
    gsap.from(".template-content.reveal-bottom", {
        y: 60, opacity: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: ".template-section", start: "top 60%", toggleActions: "play none none reverse" }
    });

    // Animasi Huruf Jatuh Mantul (Bounce) saat di-scroll nyampe section ini
    gsap.from(dragLetters, {
        y: -800, // Mulai dari jauh di atas layar
        opacity: 0,
        rotation: () => Math.random() * 180 - 90, // Muter pas lagi jatuh
        duration: 1.8,
        stagger: 0.1, // Jatuh satu-satu
        ease: "bounce.out", // Efek mantul pas nyentuh tanah
        scrollTrigger: {
            trigger: ".interactive-button-container",
            start: "top 80%", // Mulai jatuh pas area tombol masuk 80% layar
            toggleActions: "play none none reverse"
        }
    });

    // Bikin hurufnya bisa di-drag bebas
    Draggable.create(dragLetters, {
        type: "x,y,rotation", // Bisa digeser posisi & diputar
        bounds: ".interactive-button-container", // Gak bisa ditarik keluar kotak area
        onDragStart: function() {
            // Pas ditarik, hurufnya membesar dan maju ke depan (z-index)
            gsap.to(this.target, { scale: 1.2, zIndex: 999, duration: 0.2 });
        },
        onDragEnd: function() {
            // Pas dilepas, ukurannya balik normal
            gsap.to(this.target, { scale: 1, zIndex: 100, duration: 0.2 });
        }
    });
}