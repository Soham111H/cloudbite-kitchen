document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mouse Follower Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate move for dot
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Lagging move for circle
    setInterval(() => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
    }, 15);

    // 2. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-scroll').forEach(el => observer.observe(el));

    // 3. Parallax Background
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero-bg');
        if(heroBg) {
            heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.4}px)`;
        }
    });
});