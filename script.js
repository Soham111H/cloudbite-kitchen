// --- PAGE LOAD SEQUENCE ---
window.addEventListener('load', () => {
    // 1. Hide Preloader after 2.5 seconds
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if(preloader) preloader.classList.add('loaded');
        
        // 2. Open the Winter Popup shortly after (1s delay)
        setTimeout(() => {
            openWinterModal();
        }, 1000); 
    }, 3000); 
});

// --- CART DATA ---
const cart = {};

// --- UPDATE QUANTITY ---
function updateQty(name, price, change, rowId) {
    if (!cart[name]) cart[name] = { price: price, qty: 0 };
    
    cart[name].qty += change;
    if (cart[name].qty < 0) cart[name].qty = 0;

    const row = document.getElementById(rowId);
    const displaySpan = row.querySelector('.qty-display');
    displaySpan.innerText = cart[name].qty;

    if (cart[name].qty > 0) {
        row.classList.add('active-item');
    } else {
        row.classList.remove('active-item');
    }
    updateCartButton();
}

// --- UPDATE FLOATING BUTTON ---
function updateCartButton() {
    let totalQty = 0;
    let totalPrice = 0;

    for (let item in cart) {
        totalQty += cart[item].qty;
        totalPrice += (cart[item].qty * cart[item].price);
    }

    const cartBtn = document.getElementById('floating-cart');
    const totalSpan = document.getElementById('cart-total');
    const countSpan = document.getElementById('cart-count');

    totalSpan.innerText = "₹" + totalPrice;
    countSpan.innerText = totalQty + " items";

    if (totalQty > 0) {
        cartBtn.classList.add('visible');
    } else {
        cartBtn.classList.remove('visible');
    }
}

// --- SEND TO WHATSAPP ---
function sendToWhatsApp() {
    const phoneNumber = "6356300909"; 
    
    // Construct the message with newlines
    let message = "Hi Cloud Bite Kitchen! \n";
    message += "I would like to place an order for the Winter Special:\n\n";
    
    let total = 0;
    let hasItems = false;

    for (let [name, data] of Object.entries(cart)) {
        if (data.qty > 0) {
            let lineTotal = data.qty * data.price;
            total += lineTotal;
            message += `• ${data.qty} x ${name} = ₹${lineTotal}\n`;
            hasItems = true;
        }
    }

    if (!hasItems) return;

    message += "\n--------------------------------\n";
    message += `*Total Order Amount: ₹${total}*`;

    // Encode the entire message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function openWinterModal() {
    const modal = document.getElementById('winterModal');
    if(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeWinterModal() {
    const modal = document.getElementById('winterModal');
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if(menuSection) menuSection.scrollIntoView({behavior: 'smooth'});
}

// --- ANIMATION OBSERVER ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if(entry.target.querySelector('.stagger-anim')) {
                const items = entry.target.querySelectorAll('.stagger-anim');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.anim-up, .anim-down, .anim-left, .anim-right, .anim-zoom, .menu-list').forEach(el => observer.observe(el));

// Initialize Stagger CSS
document.querySelectorAll('.stagger-anim').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
});

// Cursor logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
if (window.matchMedia("(min-width: 769px)").matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, .menu-btn, button, .close-x, .menu-item, .floating-cart').forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.background = 'rgba(253, 219, 136, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.background = 'transparent';
        });
    });
}
