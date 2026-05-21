// Animasi sederhana untuk membuat halaman terlihat premium saat di-load
document.addEventListener("DOMContentLoaded", () => {
    
    // Animasi Navbar & Sidebar
    gsap.from(".detail-nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".sidebar-left", { x: -50, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    gsap.from(".sidebar-right", { x: 50, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });

    // Animasi Lingkaran (Masuk berurutan dari tengah)
    gsap.from(".circle-1", { x: 100, opacity: 0, duration: 1.2, delay: 0.3, ease: "power4.out" });
    gsap.from(".circle-2", { scale: 0.8, opacity: 0, duration: 1.2, delay: 0.5, ease: "power4.out" });
    gsap.from(".circle-3", { x: -100, opacity: 0, duration: 1.2, delay: 0.7, ease: "power4.out" });
    
    // Teks Giant "Reluxe"
    gsap.from(".giant-text", { y: 50, opacity: 0, duration: 1, delay: 0.9, ease: "back.out(1.5)" });

    // Animasi Background Huruf Besar
    gsap.from(".bg-letters span", { y: 100, opacity: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" });

    // Animasi Grid Card Bawah
    gsap.from(".card", { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.15, 
        delay: 0.8, 
        ease: "power3.out" 
    });
});