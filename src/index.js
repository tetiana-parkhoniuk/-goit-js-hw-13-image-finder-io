import './sass/main.scss';
import photosTemplate from './templates/photo-card.hbs';

import getRefs from './js/getRefs';
import ImagesApiService from './js/apiService';

import { error } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
 
const refs = getRefs();

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();

    imagesApiService.query = event.currentTarget.elements.query.value;

    if (imagesApiService.query === '') {
        return error({
            text: `Please enter specific query!`,
            delay: 500,
            closeHover: true,
        })
    }

    imagesApiService.resetPage();
    clearImagesContainer();
    fetchImages();
}

function fetchImages() {
    imagesApiService.fetchImages().then(images => {
        appendImagesMarkup(images);
    }).catch(handleError);
}


function appendImagesMarkup(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', photosTemplate(hits));
};

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}

function handleError() {
    return error({
            text: `Something went wrong. Please try again!`,
            delay: 500,
            closeHover: true,
        })
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imagesApiService.query !== '') {
            console.log('WOW')
            fetchImages();
        }
    })
}

const options = {
    rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);
