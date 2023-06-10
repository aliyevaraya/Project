const nav = document.querySelector('.header-nav')

function scrollFunc() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        nav.classList.add("fixed-nav")
    } else {
        nav.classList.remove("fixed-nav")

    }
}

window.onscroll = function () { scrollFunc() }
