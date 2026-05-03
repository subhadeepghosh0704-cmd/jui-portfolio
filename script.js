document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Custom Mouse Cursor (Only for Desktop) --- */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const hoverElements = document.querySelectorAll('a, .image-box, .btn-primary, .close-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    /* --- 2. Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* --- 3. Lightbox / Modal (Fixed for Mobile & Click Issues) --- */
    const imageBoxes = document.querySelectorAll('.image-box');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // Open Modal
    imageBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default scrolling behavior
            const img = this.querySelector('img');
            if (img) {
                modalImg.src = img.src;
                modal.classList.add('active');
            }
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modalImg.src = ''; 
        }, 300); 
    };

    // Close Triggers
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Escape Key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

});
