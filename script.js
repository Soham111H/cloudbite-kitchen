// --- AUTO POPUP ---
window.addEventListener('load', () => {
    setTimeout(() => { openWinterModal(); }, 1000); 
});

function openWinterModal() {
    const modal = document.getElementById('winterModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeWinterModal() {
    const modal = document.getElementById('winterModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

// Scroll Helper
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({behavior: 'smooth'});
}

// --- ANIMATION OBSERVER ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Staggered Animation for Menu List
            if(entry.target.querySelector('.stagger-anim')) {
                const items = entry.target.querySelectorAll('.stagger-anim');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100); // 100ms delay between each item
                });
            }
        }
    });
}, { threshold: 0.1 });

// Initialize general animations
const animatedElements = document.querySelectorAll('.anim-up, .anim-down, .anim-left, .anim-right, .anim-zoom');
animatedElements.forEach(el => observer.observe(el));

// Initialize Staggered elements (initially hidden via CSS/JS injection)
const staggerContainers = document.querySelectorAll('.menu-list');
staggerContainers.forEach(container => {
    const items = container.querySelectorAll('.stagger-anim');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });
    observer.observe(container);
});


// --- CURSOR ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, .menu-btn, button, .close-x, .menu-item').forEach(link => {
    link.addEventListener('mouseenter', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.background = 'rgba(253, 219, 136, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.background = 'transparent';
    });
});
