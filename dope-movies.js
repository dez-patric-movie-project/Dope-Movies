'use strict';

$(document).ready(function () {

    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });


    getMovies().then((movies) => {
        console.log(movies)
        // console.log(movieCard);
        removeLoader()
        // movies.forEach(function (movie) {
        //     getMovies2(movie.title).then(function (newMovie) {
        //         console.log(newMovie);
        //         editMovie({
        //             id: movie.id, //copies id from movie.id and
        //             ...newMovie //copies properties from new movie to the new object
        //         })
        //     })
        //
        // })
        renderMovies(movies)
    })

    $("#addMovie").click(function (e) {
        e.preventDefault()
        let movie = {
            title: $('#userTitle').val(),
            rating: $('#userRating').val()
        }
        getMovies2(movie.title).then(function (newMovie) {
            newMovie.rating = movie.rating // Overwrite the OMDB rating
            addMovie(newMovie)

        })

    });


    $('body').css({
        'background-image': 'url("/img/Nintendo-Dope-Boo__97995.1557939563.jpg")',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'opacity': 0.9,
        'z-index': 1,
        'background-attachment': 'fixed',
        'font-family': "'Kalam', cursive",
        // 'background': '#000428',
        // 'background': '-webkit-linear-gradient(to top, #004e92, #000428)',
        // 'background':     'linear-gradient(to top, #004e92, #000428)',
        // 'height': '100vh',
        // 'width': '100vw'

})

});
const dopeAPI = 'https://wiggly-sassy-impatiens.glitch.me/movies';
const omdbApiKey = 'afe37df3'


function renderMovies(movies){
    movies.forEach(movieDisplay)
    $('.delete-btn').click(function (e) {
        e.preventDefault()
        var id = $(this).parent().parent().attr('id')
        console.log(id)
        // $(this).parent('div').remove();
        deleteMovie({id})
        console.log(this)
    });
    $('.edit-btn').click(function (e) {
        e.preventDefault()
        var id = $(this).parent().parent().attr('id')
        console.log(id)
        let movie = {
            id,
            title: $('#userTitle').val(),
            rating: $('#userRating').val()
        }
        getMovies2(movie.title).then(function (newMovie) {
            newMovie.rating = movie.rating // Overwrite the OMDB rating
            newMovie.id = movie.id
            editMovie(newMovie)

        })
        console.log(movie)
    })
}

function movieDisplay(movie) {
    console.log(movie)

    // for(var i = 0; i < movie.length; i++) {

    $(".movies").append(`<div class="col"><div class='card m-2 text-center card-width' id='${movie.id}'>
                                <div class="card-body text-wrap">
                                <h5>${movie.title}</h5>
                                <img src="${movie.poster}" class="img-fluid"></img>
                                <p class="card-text p-0 m-0 ">Rating: ${movie.rating}</p>
                                <p class="card-text p-0 m-0 mb-2">Director: ${movie.director}</p>
                                <p class="card-text p-0 m-0 mb-2">Genre: ${movie.genre}</p> 
                                <p class="card-text p-0 m-0 mb-2">Year: ${movie.year}</p>

                                <button type="button" id="deleteMovie" class="delete-btn btn btn-danger">Delete</button>
                                <button type="button" id="editMovie" class="edit-btn btn btn-danger">Edit</button>
                                </div></div></div>`)



}

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight
    });
}

function getMovies() {
    return fetch(dopeAPI)
        .then((response) => response.json())

}
function getMovies2(title) {
    return fetch(`http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(title)}`) //encodeURIComponent replaces spaces with special characters
        .then((response) => response.json()).then(function (jsonData) {
            // console.log(jsonData);
            var movieOptions = {
                title: jsonData.Title,
                rating: jsonData.imdbRating,
                poster: jsonData.Poster,
                year: jsonData.Year,
                genre: jsonData.Genre,
                director: jsonData.Director,
                plot: jsonData.Plot,
                actors: jsonData.Actors,
            }
            return movieOptions;
        })
}
// getMovies2()


function addMovie(movie) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie) //Convert the JS object into a JSON string before sending it up to the server.
    }
    fetch(dopeAPI, options)
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            $('#movies').html('')
            getMovies().then((movies) => {
                console.log(movies)
                // console.log(movieCard);
                removeLoader()
               renderMovies(movies)
            })
        })
}
function deleteMovie(movie) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(movie)
    }
    fetch(dopeAPI +'/' + movie.id,options)
        .then((response)=>{
            return response.json();
        })
        .then((jsonData)=>{
            console.log(jsonData)
            $('#movies').html('')
            getMovies().then((movies) => {
                console.log(movies)
                // console.log(movieCard);
                removeLoader()
                renderMovies(movies)
            })

        })

}
function editMovie(movie) {
    console.log(movie);
    let options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie) //Convert the JS object into a JSON string before sending it up to the server.
    }
    fetch(dopeAPI +'/' + movie.id,options)
        .then((response)=>{
            return response.json();
        })
        .then((jsonData)=>{
            console.log(jsonData)
            $('#movies').html('')
            getMovies().then((movies) => {
                console.log(movies)
                // console.log(movieCard);
                removeLoader()
                renderMovies(movies)
            })

        })
}

