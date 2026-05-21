gsap.registerPlugin(ScrollTrigger, Draggable);

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
    preventClicks: true,
    preventClicksPropagation: true,
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
        if (this.getAttribute('href').includes('.html')) return;

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
// 5. TEMPLATE SECTION
// ========================================================
const textKata = "EXPLORE";
const dragWrapper = document.getElementById('drag-button-wrapper');

if (dragWrapper) {
    textKata.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'drag-letter';
        
        const randomRot = Math.random() * 20 - 10; 
        gsap.set(span, { rotation: randomRot, zIndex: 100 - i });
        dragWrapper.appendChild(span);
    });

    const dragLetters = document.querySelectorAll('.drag-letter');

    gsap.from(".template-content.reveal-bottom", {
        y: 60, opacity: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: ".template-section", start: "top 60%", toggleActions: "play none none reverse" }
    });

    gsap.from(dragLetters, {
        y: -800, 
        opacity: 0,
        rotation: () => Math.random() * 180 - 90,
        duration: 1.8,
        stagger: 0.1, 
        ease: "bounce.out", 
        scrollTrigger: {
            trigger: ".interactive-button-container",
            start: "top 80%", 
            toggleActions: "play none none reverse"
        }
    });

    Draggable.create(dragLetters, {
        type: "x,y,rotation", 
        bounds: ".interactive-button-container", 
        onDragStart: function() {
            gsap.to(this.target, { scale: 1.2, zIndex: 999, duration: 0.2 });
        },
        onDragEnd: function() {
            gsap.to(this.target, { scale: 1, zIndex: 100, duration: 0.2 });
        }
    });
}

// ========================================================
// 6. 3D ROOM PROJECTION JS
// ========================================================
const roomLayers = gsap.utils.toArray('.room-layer');

if (roomLayers.length > 0) {
    roomLayers.forEach((layer, i) => {
        gsap.set(layer, { 
            z: -1500 * (i + 1), 
            opacity: 0,
            scale: 0.8
        });
    });

    const roomTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#room-3d",
            start: "top top", 
            end: "+=4000",    
            scrub: 1,         
            pin: true,        
        }
    });

    roomLayers.forEach((layer, i) => {
        roomTl.to(layer, {
            z: 1000,          
            scale: 1.5,       
            opacity: 1,       
            ease: "none",
            duration: 2       
        }, i * 0.8);          

        roomTl.to(layer, {
            opacity: 0,
            ease: "power2.in",
            duration: 0.5
        }, (i * 0.8) + 1.5); 
    });
}