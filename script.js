document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Navbar scroll efekti
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Sayfa yüklendiğinde navbar kontrolü
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Counter animasyonu
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Counter'lar görünür olduğunda animasyonu başlat
    const aboutSection = document.querySelector('.about-section');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(aboutSection);

    // Form gönderimi
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Burada form verilerini işleyebilirsiniz (AJAX, email gönderme vb.)
            console.log('Form gönderildi:', data);
            
            // Kullanıcıya geri bildirim
            alert('Teşekkür ederiz! Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.');
            
            // Formu temizle
            this.reset();
        });
    }

    // Düzgün scroll için
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Mobil menüyü kapat
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Galeri item'larına hover efekti
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
            this.querySelector('.overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
            this.querySelector('.overlay').style.opacity = '0';
        });
    });

    // Ürün kartlarına hover efekti
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            this.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Talaş parçacıkları efekti
    function createSawdust() {
        const sawdust = document.createElement('div');
        sawdust.className = 'sawdust-particle';
        
        // Rastgele pozisyon ve boyut
        const size = Math.random() * 8 + 2;
        sawdust.style.width = `${size}px`;
        sawdust.style.height = `${size}px`;
        sawdust.style.left = `${Math.random() * 100}vw`;
        
        // Rastgele animasyon süresi
        const duration = Math.random() * 10 + 5;
        sawdust.style.animationDuration = `${duration}s`;
        
        // Rastgele opaklık
        sawdust.style.opacity = Math.random() * 0.5 + 0.3;
        
        document.body.appendChild(sawdust);
        
        // Animasyon bittiğinde element'i kaldır
        setTimeout(() => {
            sawdust.remove();
        }, duration * 1000);
    }
    
    // Belli aralıklarla talaş oluştur
    setInterval(createSawdust, 300);
});
