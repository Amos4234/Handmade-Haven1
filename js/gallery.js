// gallery.js — lightbox preview for gallery.html

document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            document.body.appendChild(overlay);

            // Remove overlay on click
            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        });
    });
});
// gallery.js — lightbox preview for gallery.html

document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            document.body.appendChild(overlay);

            // Remove overlay on click
            overlay.addEventListener('click', () => {
                overlay.remove();
            });
        });
    });
});
