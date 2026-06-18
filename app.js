document.addEventListener('DOMContentLoaded', () => {
    const skelly = document.getElementById('electric-skelly');
    const waContainer = document.querySelector('.wa-container');
    const waBtn = document.querySelector('.wa-btn');
    
    let lastScrollY = window.scrollY;
    let velocity = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        velocity = Math.abs(currentScroll - lastScrollY);
        
        // 1. SKELETON SHOCK LOGIC
        // If scrolling fast, the skeleton gets "shocked" by electricity
        if (velocity > 15) {
            skelly.classList.add('shock-effect');
            skelly.innerText = "💀⚡"; // Shocked face
            skelly.style.transform = `translateY(${Math.sin(currentScroll/10)*20}px)`;
        } else {
            skelly.classList.remove('shock-effect');
            skelly.innerText = "🦴🕺"; // Dancing skeleton
        }

        // 2. WHATSAPP SMILE TRACKER
        // As user scrolls, the button grows and reveals a happy message
        if (currentScroll > 200) {
            waContainer.classList.add('active');
            // Make the button "pulse" to the rhythm of the scroll
            let pulse = 1 + (velocity / 100);
            waBtn.style.transform = `scale(${Math.min(pulse, 1.4)})`;
        } else {
            waContainer.classList.remove('active');
        }

        lastScrollY = currentScroll;
    });
});
