// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Create a simple response
    const name = form.querySelector('input[type="text"]').value;
    
    // Show success message
    alert(`Merci ${name}! Nous avons reçu votre message et vous contacterons bientôt.`);
    
    // Reset form
    form.reset();
}

// Handle newsletter submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit();
        });
    }
});

function handleNewsletterSubmit() {
    const email = document.getElementById('newsletterEmail').value;
    const messageDiv = document.getElementById('newsletterMessage');
    
    // Validation d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        messageDiv.textContent = '❌ Veuillez entrer un email valide';
        messageDiv.className = 'newsletter-message error';
        return;
    }
    
    // Stockage local de l'email (pour démonstration)
    let emails = JSON.parse(localStorage.getItem('newsletter_emails')) || [];
    
    if (emails.includes(email)) {
        messageDiv.textContent = '⚠️ Vous êtes déjà abonné avec cet email';
        messageDiv.className = 'newsletter-message error';
        return;
    }
    
    // Ajouter l'email à la liste
    emails.push(email);
    localStorage.setItem('newsletter_emails', JSON.stringify(emails));
    
    // Afficher le message de succès
    messageDiv.textContent = '✓ Merci pour votre abonnement! Vérifiez votre email.';
    messageDiv.className = 'newsletter-message success';
    
    // Réinitialiser le formulaire
    document.getElementById('newsletterForm').reset();
    
    // Effacer le message après 5 secondes
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'newsletter-message';
    }, 5000);
    
    // Log pour vérification
    console.log('Emails inscrits à la newsletter:', emails);
}

// Add smooth scroll behavior to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to service cards, steps, and team members
document.querySelectorAll('.service-card, .step, .team-member').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    const statsSection = document.querySelector('.stats');
    
    if (!statsSection) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                stats.forEach(stat => {
                    const text = stat.textContent;
                    const isNumber = /^\d+/.test(text);
                    
                    if (isNumber) {
                        const finalValue = parseInt(text);
                        let currentValue = 0;
                        const increment = finalValue / 50;
                        
                        const counter = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= finalValue) {
                                stat.textContent = text;
                                clearInterval(counter);
                            } else {
                                stat.textContent = Math.floor(currentValue) + (text.match(/[^0-9]/g) ? text.slice(-1) : '');
                            }
                        }, 40);
                    }
                });
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counterObserver.observe(statsSection);
}

// Run counter animation when page loads
document.addEventListener('DOMContentLoaded', animateCounters);

// Add console message
console.log('%cBienvenue sur ProTradeX! 🚀', 'color: #0066ff; font-size: 20px; font-weight: bold;');
console.log('%cLa plateforme de trading propriétaire pour les traders sérieux', 'color: #666; font-size: 14px;');