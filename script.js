document.addEventListener('DOMContentLoaded', () => {

    /* --- Custom Mouse Cursor --- */
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

    const hoverElements = document.querySelectorAll('a, .image-box, .btn-primary');
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

    /* --- Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* --- Lightbox / Modal --- */
    const imageBoxes = document.querySelectorAll('.image-box');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    imageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const imgSrc = box.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('active');
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modalImg.src = '', 400); 
    };

    closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});