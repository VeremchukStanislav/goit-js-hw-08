import galleryItems from "./gallery-items.js"

// Создание и рендер разметки по массиву

const ref = {
    galleryContainer: document.querySelector('.js-gallery'),
    galleryImage: document.querySelector('.gallery__image'),
    galleryLink: document.querySelector('.gallery__link'),
    jsLightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxButton: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
}

const galleryMarkup = createGalery(galleryItems);
ref.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalery(gallery) {
    return gallery.map(({preview , original, description},index) => {
        return `
        <li class="gallery__item">
            <a
            class="gallery__link"
            href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
            />
            </a>
            </li> 
        `;
    })
    .join('');
}

//Делегирование на галерее ul.js-gallery и получение url большой картинки.
// Открытие модалки по клику на картинке.
ref.galleryContainer.addEventListener('click', openJsLightbox);

function openJsLightbox(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }

    const bigURL = e.target.dataset.source;
    const imgALT = e.target.alt;
    const index = e.target.dataset.index;

    ref.jsLightbox.classList.add("is-open");
    ref.lightboxImage.src = bigURL;
    ref.lightboxImage.alt = imgALT;
    ref.lightboxImage.dataset.index = index;
}