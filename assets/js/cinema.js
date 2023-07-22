let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));
let ls_movieData = JSON.parse(localStorage.getItem("_movieData"));
const makeRedirectCinemaPage = () => {
    let ss_redirectedCinemaId = JSON.parse(sessionStorage.getItem("_redirectedCinemaId"));
    if (ss_redirectedCinemaId) {
        ls_cinemaData.map(obj => {
            if (obj.cid === ss_redirectedCinemaId) {
                document.getElementById("dynamicCinema").innerHTML = '\
                <div class="row">\
                    <div class="block">\
                        <h5>' + obj.name + '</h5>\
                        <img src=../assets/images/' + obj.image + '>\
                    </div>\
                    <div class="content_block">\
                        <h1 class="gredi_text">' + obj.name + '</h1>\
                        <p><i class="fa-solid fa-location-dot"></i>' + obj.location + '</p>\
                        <p><i class="fa-solid fa-house-medical"></i>' + obj.facilities + '</p>\
                        <button type="button" class="btn">Know More...</button>\
                    </div>\
                </div>';
                document.getElementById("movieTitle").innerHTML = 'On screen movies at <span>' + obj.name + '</span>';
            }
        });
        let html_movieBlock = '';
        ls_movieData.map(obj => {
            if (obj.cid === ss_redirectedCinemaId) {
                html_movieBlock += '\
                <a href onclick="movieRedirect(' + obj.mid + ')" class="block" id="block-' + obj.mid + '">\
                    <h5>' + obj.name + '</h5>\
                    <img src="../assets/images/' + obj.image + '">\
                </a>';
            document.getElementById("moviesInCinema").innerHTML = html_movieBlock;
            }
        });
    } else {
        document.querySelectorAll("#cinemaData .hero_section")[0].remove();
        document.querySelectorAll("#cinemaData .movie_in_cinema_section")[0].remove();
    }

    // Make Cinema block \\
    let html_cinemaBlock = '';
    ls_cinemaData.map((obj) => {
        html_cinemaBlock += '\
            <a href onclick="cinemaRedirect(' + obj.cid + ')" class="block" id="block-' + obj.cid + '">\
                <h5>' + obj.name + '</h5>\
                <img src="../assets/images/' + obj.image + '">\
            </a>';
        document.getElementById("cinemaDisplay").innerHTML = html_cinemaBlock;
    });
}
window.onload = makeRedirectCinemaPage();