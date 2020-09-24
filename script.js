// window.addEventListener('load', () => {
//     loader.style.display = 'none';
//     content.classList.remove('invisible');
// });
let loader = document.querySelector('.loader');
let content = document.querySelector('.content');
let renderDiv = document.getElementById('renderMovie');
let deleteBtn = document.getElementsByClassName('delete-btn');
console.log(deleteBtn);
let deleteAllBtn = document.getElementById('delete-all-movie');
let addBtn = document.getElementById('add-btn');
let editBtn = document.getElementById('edit-btn');
let addMovieTitle = document.getElementById('add-movie-title');

const movieUrl = 'https://synonymous-evening-millennium.glitch.me/movies';
const tmdbUrl = `https://api.themoviedb.org/3/movie/123?api_key=${APIKEY}&append_to_response=videos,images`;
const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=Jack+Reacher`;

const fetchAPIById = (id) => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&append_to_response=videos,images`)
    .then(res => res.json())
    .catch(err => console.error(err));

fetchAPIById(122).then(data => console.log(data));

const fetchAPIByName = (name) => fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${name}`)
    .then(res => res.json())
    .catch(err => console.log(err));

const getMovies = () => fetch(movieUrl)
    .then(res => res.json())
    .catch(err => console.error(err));

getMovies().then(movies => {
    console.log(movies);
    movies.forEach(movie => renderMovie(movie));
    loader.style.display = 'none';
    content.classList.remove('invisible');
})

function renderMovies() {
    getMovies().then(movies => {
        console.log(movies);
        movies.forEach(movie => renderMovie(movie));
    })
}

function renderMovie(movie) {
    let output = `
                <div class="card">
                    <div class="card-title">Title: ${movie.title}</div>
                    <div class="card-body">
                        <img class="poster" src= "https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="movie poster">
                        <div>Rating: ${movie.vote_average}</div>
                        <div>Genres: ${movie.genres.reduce((acc, {name}) => acc += `${name} `, '')}</div>
                        <p>${movie.overview}</p>
                    </div>
                    <div class="card-footer">
                        <button class="delete-btn">delete</button>                 
                        <button>edit</button>                 
                    </div>
                </div>`;
    renderDiv.innerHTML += output;
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.disabled = true;
    let name = formatString(addMovieTitle.value);
    if (name === '') {
        alert('Please put in a valid movie name');
        e.target.disabled = false;
    // } else if () {

    } else {
        fetchAPIByName(name)
            .then(data => fetchAPIById(data.results[0].id))
            .then(data => {
                addMovie(data);
                renderMovie(data);
                e.target.disabled = false;
            });
    }
    addMovieTitle.value = '';
})

// let deleteArr = Array.from(deleteBtn);
// console.log(deleteArr);
// for(let btn of deleteArr) {
//     console.log(btn);
//     btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         console.log(e.target);
//         console.log(e.currentTarget);
//     })
// }

// deleteBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     console.log(e.currentTarget);
// })

deleteAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies().then(movies => {
        movies.map(ele => ele.id).forEach(id => deleteMovie(id));
    });
    // getMovies().then(data => console.log(data));
    // renderMovies();
    renderDiv.innerHTML = '';
})

function formatString(str) {
    return str.split(' ').map(ele => ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase()).join('+');
}

const addMovie = movie => fetch(`${movieUrl}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: created ${JSON.stringify(data)}`);
        return data.id;
    })
    .catch(console.error);

const editMovie = movie => fetch(`${movieUrl}/${movie.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
    })
    .catch(console.error);

const deleteMovie = id => fetch(`${movieUrl}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(() => {
        console.log(`Success: deleted movie with id of ${id}`);
    })
    .catch(console.error);


var stars = document.getElementsByClassName('star');
for (let i = 0; i < stars.length; i++) {
    let id = stars[i].getAttribute('data-value');
    stars[i].addEventListener('click', () => document.getElementById('review-result').innerText = id);
}