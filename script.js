// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            }
        }
    }
});

// Smooth scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Modal functionality
function openApplication() {
    document.getElementById('application-modal').style.display = 'block';
}

const modal = document.getElementById('application-modal');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission
document.getElementById('application-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Collect form data
    const data = {
        steam: form.querySelector('input[type="text"]:nth-child(1)').value,
        mmr: form.querySelector('input[type="text"]:nth-child(2)').value,
        position: form.querySelector('input[type="text"]:nth-child(3)').value,
        telegram: form.querySelector('input[type="text"]:nth-child(4)').value,
        about: form.querySelector('textarea').value
    };
    
    const message = `
🎮 <b>Новая заявка в ZXC ТВАРИ</b>

👤 Steam: ${data.steam}
📊 MMR: ${data.mmr}
🎯 Позиция: ${data.position}
📱 Telegram: ${data.telegram}
📝 О себе: ${data.about}
    `;
    
    try {
        const response = await fetch(
            `https://api.telegram.org/bot8101742751:AAEUkfMSGqpqENc0R_NyGvrUFKiY1WMZNU4/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: -7163981939,
                    text: message,
                    parse_mode: 'HTML'
                })
            }
        );
        
        if (response.ok) {
            alert('Заявка отправлена! Мы рассмотрим её в ближайшее время.');
            modal.style.display = 'none';
            form.reset();
        } else {
            alert('Ошибка при отправке. Попробуйте позже.');
        }
    } catch (error) {
        alert('Ошибка при отправке. Попробуйте позже.');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Add hover effects to cards
document.querySelectorAll('.about-card, .achievement-card, .member-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add hover effects to Discord icons
document.querySelectorAll('.member-social a[title]').forEach(icon => {
    const tooltip = document.createElement('span');
    tooltip.className = 'discord-tooltip';
    tooltip.textContent = icon.getAttribute('title');
    icon.appendChild(tooltip);

    icon.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
    });

    icon.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
    });
});