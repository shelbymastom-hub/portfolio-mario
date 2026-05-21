document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Ambil ID dari URL (contoh: project-detail.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('id') || '1'; 

    // 2. DATABASE KONTEN DINAMIS
    const projectData = {
        '1': {
            layout: 'split',
            image: '1.png',
            title: 'Cinematic Realism',
            subtitle: '85mm f/1.4 Lens Study',
            desc: 'Eksplorasi mendalam tentang pencahayaan hyper-realistic dan efek bokeh. Fokus utama pada rim lighting sinematik yang kontras dengan latar belakang hitam minimalis.',
            tags: ['Photography', 'AI Prompting', 'Lighting']
        },
        '2': {
            layout: 'hero',
            image: '2.png',
            title: 'Digital Scrollytelling',
            subtitle: 'Interactive Web Interface',
            desc: 'Membangun antarmuka website dengan pergerakan sumbu X dan Z. Menggunakan library animasi canggih untuk menciptakan transisi yang mulus layaknya sebuah film.',
            tags: ['UI/UX', 'GSAP', 'Web Development']
        },
        '3': {
            layout: 'grid',
            image: '3.png',
            title: 'Black Romance',
            subtitle: '80s Retro Elegance',
            desc: 'Menggabungkan estetika retro tahun 80-an dengan nuansa high-fashion streetwear. Desain berpusat pada kekosongan ruang (negative space) dan tipografi editorial yang kuat.',
            tags: ['Branding', 'Typography', 'Editorial']
        },
        // Jika ID tidak ada di database, template default akan mengambil file gambarnya otomatis
        'default': {
            layout: 'split',
            image: `${projectId}.png`,
            title: `Project Archive ${projectId}`,
            subtitle: 'Experimental Visuals',
            desc: 'Proyek eksperimental yang menembus batas desain konvensional. Memadukan elemen estetika modern dengan struktur kode yang sangat rapi (clean code) dan tipografi dinamis.',
            tags: ['Concept', 'Design', 'Art Direction']
        }
    };

    const data = projectData[projectId] || projectData['default'];
    const container = document.getElementById('dynamic-content-container');

    // 3. RENDER HTML BERDASARKAN TIPE LAYOUT
    let htmlContent = '';

    if (data.layout === 'split') {
        htmlContent = `
            <div class="layout-split">
                <div class="split-text reveal-anim">
                    <span class="badge">${data.tags[0]}</span>
                    <h1 class="title-bodoni">${data.title}</h1>
                    <h3 class="subtitle">${data.subtitle}</h3>
                    <p class="desc">${data.desc}</p>
                    <div class="tags-container">
                        ${data.tags.map(tag => `<span class="outline-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="split-image reveal-anim">
                    <img src="${data.image}" alt="${data.title}">
                </div>
            </div>
        `;
    } else if (data.layout === 'hero') {
        htmlContent = `
            <div class="layout-hero">
                <div class="hero-image reveal-anim">
                    <img src="${data.image}" alt="${data.title}">
                    <h1 class="hero-title-overlay title-bodoni">${data.title}</h1>
                </div>
                <div class="hero-content reveal-anim">
                    <h3 class="subtitle">${data.subtitle}</h3>
                    <p class="desc">${data.desc}</p>
                    <div class="tags-container justify-center">
                        ${data.tags.map(tag => `<span class="outline-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    } else {
        htmlContent = `
            <div class="layout-grid">
                <div class="grid-col text-col reveal-anim">
                    <h1 class="title-bodoni">${data.title}</h1>
                    <p class="desc">${data.desc}</p>
                </div>
                <div class="grid-col img-col reveal-anim">
                    <img src="${data.image}" alt="${data.title}">
                </div>
                <div class="grid-col details-col reveal-anim">
                    <h3 class="subtitle">${data.subtitle}</h3>
                    <div class="tags-container-vertical">
                        ${data.tags.map(tag => `<span class="outline-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = htmlContent;

    // 4. JALANKAN ANIMASI GSAP
    gsap.from(".detail-nav", { y: -30, opacity: 0, duration: 1, ease: "power3.out" });
    
    gsap.from(".reveal-anim", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    });
});