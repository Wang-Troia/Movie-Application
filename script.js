let loader = document.querySelector('.loader');
let content = document.querySelector('.content');
let renderdiv = document.getElementById('renderMovie');
// window.addEventListener('load', () => {
//     loader.style.display = 'none';
//     content.classList.remove('invisible');
// });

const movieUrl = 'https://synonymous-evening-millennium.glitch.me/movies';

const getMovies = () => fetch(movieUrl)
    .then(res => res.json())
    .catch(err => console.error(err));

getMovies().then(movies => {
    console.log(movies);
    movies.forEach(movie => renderMovie(movie));
    loader.style.display = 'none';
    content.classList.remove('invisible');
})

function renderMovie(movie) {
    let output = `<div>Movie Title: ${movie.title}</div>
                  <div>Rating: ${movie.rating}</div>`;
    renderdiv.innerHTML += output;
}



var stars = document.getElementsByClassName('star');
for (let i = 0; i < stars.length; i++) {
    let id = stars[i].getAttribute('data-value');
    stars[i].addEventListener('mouseenter', () => document.getElementById('review-result').innerText = id);
}