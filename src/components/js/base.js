import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import scrollLoadMore from "./scroll";
import API from './search';
import Markup from './markup';
const newAPI = new API();
const newMarkup = new Markup();
let gallery = new SimpleLightbox('.gallery a', { 
    captionsData:'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});



const form = document.getElementById("search-form");
const dataInput = form.elements.searchQuery;
const buttonScroll = form.elements.buttonScroll;
form.addEventListener("submit", clickSearch);

const loadMoreButton = document.querySelector(".load-more");
loadMoreButton.addEventListener("click", loadMore);

function clickSearch(event) {
    event.preventDefault();
    const value = dataInput.value.trim(); 
    if (value === "") {
        clear();
        newAPI.messageEmptyRecvest()
        return
    } else startSearch()
};

async function loadMore() {
    await newAPI.getReqest()
        .then(data => markupCallFunction(data))
        .catch(Error);
        slowScroll();
};

async function startSearch(){
    clear();
    checkScroll();
    await newAPI.getReqest()
        .then(data => markupCallFunction(data))
        .catch(Error);
};

function markupCallFunction (data) {
    newMarkup.dataMarkup = data;
    newMarkup.getNewsList();
    checkLoadMoreButton();
    gallery.on('show.simplelightbox');
    gallery.refresh();    
}

function checkLoadMoreButton() {
    if (newAPI.getPage() !== 1) {
        loadMoreButton.classList.remove("hidden");
    } else if (loadMoreButton.classList.contains("hidden")) {
        return
    } else loadMoreButton.classList.add("hidden");
};

function clear() {
    newMarkup.clearNewsList();
    newAPI.resetPage();
    newAPI.dataForAPI = dataInput.value;
    checkLoadMoreButton();
}

function slowScroll() {
    const dir = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
    const { height: cardHeight } = dir;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function checkScroll() {
    if (buttonScroll.textContent === "Scroll enable") {
        window.addEventListener("scroll", scrollLoadMore);
        return  
    } window.removeEventListener("scroll", scrollLoadMore); 
}

function scrollLoadMore() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && newAPI.getPage() !== 1) {

        loadMore();
    }
   
}