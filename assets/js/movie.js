let f_movieDataArray = filterdMovieData();
const makeRedirectMoviePage = () => {
    let ss_redirectedMovieId = JSON.parse(sessionStorage.getItem("_redirectedMovieId"));
    if (ss_redirectedMovieId) {
        JSON.parse(localStorage.getItem("_movieData")).map(obj => {
            if (obj.mid === ss_redirectedMovieId) {
                document.getElementById("dynamicMovie").innerHTML = '\
                <div class="row">\
                    <div class="block">\
                        <h5>' + obj.name + '</h5>\
                        <img src=../assets/images/' + obj.image + '>\
                    </div>\
                    <div class="content_block">\
                        <h1 class="gredi_text">' + obj.name + '</h1>\
                        <p class="type"><span>Action</span><span>Crim</span><span>Adventure</span></p>\
                        <p class="view">2D, 3D, ICE 3D, 4DX 2D</p>\
                        <p class="language">Hindi, Gujrati, Malyalam, Marathi, Telugu, Kannada, punjabi</p>\
                        <p><span class="time">2h 30m</span><span class="date">1 Jan, 2024</span></p>\
                        <button id="bookBtn" type="button" class="btn" onclick="handleTickets(' + "'" + obj.name + "'" + ')">Book Tickets</button>\
                    </div>\
                </div>\
                <div class="about_movie">\
                    <div class="title_part">\
                        <h4>About ' + obj.name + ':</h4>\
                    </div>\
                    <p class="description">' + obj.description + '</p>\
                </div>\
                ';
            }
        });
    } else {
        document.querySelectorAll("#movieData .hero_section")[0].remove();
    }

    // Make Movie block \\
    let movieBlock = '';
    f_movieDataArray.map((obj) => {
        movieBlock += '\
            <a href onclick="movieRedirect(' + obj.mid + ')" class="block" id="block-' + obj.mid + '">\
                <h5>' + obj.name + '</h5>\
                <img src="../assets/images/' + obj.image + '">\
            </a>';
        document.getElementById("movieDisplay").innerHTML = movieBlock;
    });
}
window.onload = makeRedirectMoviePage();

const handleTickets = (movieName) => {
    sessionStorage.setItem("_movieForTickeBook", JSON.stringify(movieName));
    window.location = "../user/book-ticket.html";
}