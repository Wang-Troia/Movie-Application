let loader = document.querySelector('.loader');
let content = document.querySelector('.content');
window.addEventListener('load', () => {
    loader.style.display = 'none';
    content.classList.remove('invisible');
});

const movieUrl = 'https://synonymous-evening-millennium.glitch.me/movies'

const getMovies = () => fetch(movieUrl)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(console.error);

getMovies()