'use strict';
console.log('hi');
$( document ).ready(function() {
    console.log( "ready!" );
const dopeAPI = 'https://wiggly-sassy-impatiens.glitch.me/movies';

$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function(){
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });
    function removeLoader(){
        $( "#loadingDiv" ).fadeOut(500, function() {
            // fadeOut complete. Remove the loading div
            $( "#loadingDiv" ).remove(); //makes page more lightweight
        });
    }

    function getMovies() {
    return fetch(dopeAPI)
        .then((response)=>response.json())
}
getMovies().then((movies)=>{
    console.log(movies)
    removeLoader() //Removing the loading message and loading movies

})




});