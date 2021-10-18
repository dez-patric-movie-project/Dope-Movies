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
        movies.forEach(movieDisplay)
    })

    $("#addMovie").click(function (e) {
        e.preventDefault()
        let movie = {
            title: $('#userTitle').val(),
            rating: $('#userRating').val()
        }
        addMovie(movie)
    });

    $('#deleteMovie').click(function (e) {
        e.preventDefault()
        $(this).parent().remove(this);
        deleteMovie(this)
        console.log(this)
    });


});
const dopeAPI = 'https://wiggly-sassy-impatiens.glitch.me/movies';
const omdbApiKey = 'afe37df3'
function movieDisplay(movie) {
    console.log(movie)

    // for(var i = 0; i < movie.length; i++) {

    $(".movies").append(`<div class='card m-2 text-center card-width' id='${movie.id}'>
                                <div class="card-body text-wrap">
                                <h5>${movie.title}</h5>
                                <img src="${movie.poster}"></img>
                                <p class="card-text p-0 m-0 ">Rating: ${movie.rating}</p>
                                <p class="card-text p-0 m-0 mb-2">Genre: ${movie.genre}</p>
                                <button type="button" id="deleteMovie" class="delete-btn btn btn-danger">Delete</button></div></div>`)

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
                movies.forEach(movieDisplay)
            })
        })
}
function deleteMovie(movie) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    }
    fetch(dopeAPI,options)
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
                movies.forEach(movieDisplay)
            })

        })

}