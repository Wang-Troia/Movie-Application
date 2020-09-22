let loader = document.querySelector('.loader');
let content = document.querySelector('.content');
window.addEventListener('load', () => {
    loader.style.display = 'none';
    content.classList.remove('invisible');
});

