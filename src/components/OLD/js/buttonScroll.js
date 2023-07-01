const buttonScroll = document.querySelector(".form-checkbox")
buttonScroll.addEventListener("click", changeContent)

function changeContent() {
    if (buttonScroll.textContent === "Scroll enable") {
        buttonScroll.textContent = "Scroll disable"
        // window.removeEventListener("scroll", scrollLoadMore);
        return
    } else {
        buttonScroll.textContent = "Scroll enable";
    } 
}


//! Infinite scroll
// function handleScroll() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     fetchArticles();
//   }
// }

// window.addEventListener("scroll", handleScroll);