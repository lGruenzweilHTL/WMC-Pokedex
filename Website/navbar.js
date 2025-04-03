function toggleNavbar() {
    const nav = document.querySelector('.navigation-bar');
    nav.classList.toggle('hide');
}
document.querySelector('.navPokeball').addEventListener('click', toggleNavbar);