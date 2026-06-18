// shared.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Skeleton Element
    const skelWrap = document.createElement('div');
    skelWrap.id = 'skeleton-container';
    skelWrap.innerHTML = `💀<br>🕺`; // Use an SVG or Icon for better look
    document.body.appendChild(skelWrap);

    // 2. WhatsApp Logic
    const wa = document.createElement('a');
    wa.id = 'wa-float';
    wa.href = "https://wa.me/2349064859498";
    wa.innerHTML = `<div class="wa-bubble">Hello! Tuknova here! 👋</div><svg viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.7 27.2 106.2 27.2h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`;
    document.body.appendChild(wa);

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const scrollDelta = currentScroll - lastScroll;

        // 3. The Funny Dance & Shock Logic
        if (Math.abs(scrollDelta) > 10) {
            skelWrap.style.transform = `translateY(${Math.sin(currentScroll/10)*20}px) rotate(${Math.sin(currentScroll/5)*15}deg)`;
            skelWrap.style.filter = `drop-shadow(0 0 10px #00d4ff) brightness(2)`;
            createBolt();
        } else {
            skelWrap.style.filter = `none`;
        }

        // 4. WhatsApp Happiness Logic
        if (currentScroll > 300) {
            wa.classList.add('show-bubble');
            wa.style.transform = `scale(${1 + Math.abs(Math.sin(currentScroll/50) * 0.2)})`;
        } else {
            wa.classList.remove('show-bubble');
        }
        lastScroll = currentScroll;
    });

    function createBolt() {
        const bolt = document.createElement('div');
        bolt.className = 'bolt';
        bolt.style.left = (Math.random() * 80) + 'px';
        bolt.style.top = (Math.random() * 100) + 'px';
        bolt.style.height = (Math.random() * 30) + 'px';
        skelWrap.appendChild(bolt);
        bolt.style.opacity = '1';
        setTimeout(() => bolt.remove(), 100);
    }
});
