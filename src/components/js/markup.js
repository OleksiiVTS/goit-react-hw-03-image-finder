import '../css/styles.css';

const div = document.querySelector(".gallery");

export default class Markup {
    constructor() {
        this.dataMarkup = "";
    } 

creatMarkup() {
    const articles = this.dataMarkup;
    return articles.reduce(
        (markup, article) => markup + this.paintMarkup(article),
        ""
    );
    }

paintMarkup({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads
}) {
        return `
        <a href="${largeImageURL}">
        <div class="photo-card">
            <div class="photo-conteiner">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </div>
            <div class="info">
            <p class="info-item">
                <b>Likes</b> 
                ${likes}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${downloads}
            </p>
            </div>
        </div>
        </a>
        `
    }

getNewsList(){
    const fullMarkup = this.creatMarkup()
    div.insertAdjacentHTML("beforeend", fullMarkup);
    }

clearNewsList() {
    div.innerHTML = "";
    }

}

