'use strict';

$( document ).ready(function() {
    const dopeAPI = 'https://wiggly-sassy-impatiens.glitch.me/movies';

    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });

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

    getMovies().then((movies) => {
        console.log(movies)
        let movieCard = {
            title: movies[0].title,
            poster: movies[0].poster,
            actors: movies[0].actors,
            director: movies[0].director
        }
        // console.log(movieCard);
        removeLoader()
        movies.forEach(movieDisplay)

        function movieDisplay(movie) {
            // console.log(movie)

            // for(var i = 0; i < movie.length; i++) {

                $(".movies").append(`<div class='card m-2 text-center card-width' id='${movie.id}'>
                                <div class="card-body text-wrap">
                                <h5>${movie.title}</h5>
                                <img src="${movie.poster}"></img>
                                <p class="card-text p-0 m-0 ">Rating: ${movie.rating}</p>
                                <p class="card-text p-0 m-0 mb-2">Genre: ${movie.genre}</p>
                                <button type="button" class="delete-btn btn btn-danger">Delete</button></div></div>`)


                $(".btn").click(function (e) {
                    e.preventDefault()
                    console.log(movies)

                });


            function addMovie(movie) {
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie) //Convert the JS object into a JSON string before sending it up to the server.
                }
                return fetch(dopeAPI, options)
                    .then((response) => {
                        console.log(response.json())
                        console.log(addMovie())
                        response.json()
                    })
            }


        }
    })


});

// var html = "<div class=\"row col card card-body text-center\" style=\" width: 18rem; margin: 1em;\">" +
//     // '<div>' + reverseGeocode(data.lat.lon) + '</div>'+
//     '<h6>Date: ' + convertDateTime(data.daily[i].dt) + '</h6>' +
//     '<div>Today: ' + data.daily[i].temp.day + '</div>' +
//     '<div>' +    '<img src="http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png">' + '</img>'  + '</div>' +
//     '<div>L: ' + data.daily[i].temp.min + '</div>' +
//     '<div>H: ' + data.daily[i].temp.max + '</div>' +
//     '<div>Tonight: ' + data.daily[i].temp.night + '</div>' +
//     '<div>Conditions: ' + data.daily[i].weather[0].description + '</div>' +
//
//     '</div>'
// $('#five-day').append(html)
// }