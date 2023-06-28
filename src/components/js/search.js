import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = "36502661-e8ee83efff2e99e0261d33261";
const URL = "https://pixabay.com/api/";
const quantityPage = 40;

const options = new URLSearchParams({
    per_page: quantityPage,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
}).toString() 




export default class API {
    constructor() {
       this.page = 1;
       this.dataForAPI = "";
    }

    async getReqest() {
        const {data} = await axios.get(`${URL}?key=${API_KEY}&q=${this.dataForAPI}&page=${this.page}&${options}`)
        this.messageInfoRecvest(data.totalHits)
        if (data.totalHits === 0) {
            this.messageEmptyRecvest()
            return
        }
        if (data.hits.length >= quantityPage) {
            this.incrementPage();
        } else {
            this.messageEndRevest();
            this.page = 1;
        }
        return data.hits
    }

    getPage(){
        return this.page;
    }

    resetPage() {
        this.page = 1;
    }
    
    incrementPage() {
        // console.log(`this.page ${this.page}`)
        this.page += 1;
    }

    messageEmptyRecvest() {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        }
    
    messageEndRevest() {
        Notify.info("We're sorry, but you've reached the end of search results.");
        }
    
    messageInfoRecvest(totalHits) {
        // console.log(totalHits)
        if (this.page === 1 && totalHits!== 0) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        } return
        }
    
};
