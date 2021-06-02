const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21882924-40498065f1aa5022828b315f8';

export default class ImagesApiServie {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        try {
            const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            
            this.incrementPage();
            
            return data.hits;
        } catch (error) {
            console.log(error);
        }
    }

    // fetchImages() {
    //     const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
    //     return fetch(url)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.incrementPage();

    //             return data.hits;  
    //         });
    // }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
