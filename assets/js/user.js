let ref_filter = document.getElementById("filterData");
let f_movieDataArray = filterdMovieData();
let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));

// movie and cinema filter \\
ref_filter.addEventListener("keyup", function () {
    let ref_cinemaBlock = [...document.getElementById("cinemaDisplay").children];
    ref_cinemaBlock.map(block => {
        block.style.display = "none";
    });

    let ref_movieBlock = [...document.getElementById("movieDisplay").children];
    ref_movieBlock.map(block => {
        block.style.display = "none";
    });

    let get_filterData = (ref_filter.value).toLowerCase();

    let f_cinemaName = ls_cinemaData.filter((cinemaObj) => cinemaObj.name.toLowerCase().includes(get_filterData));
    f_cinemaName.map((obj) => {
        document.getElementById("block-" + obj.cid).style.display = "block";
    });

    let f_movieName = f_movieDataArray.filter((movieObj) => movieObj.name.toLowerCase().includes(get_filterData));
    f_movieName.map((obj) => {
        document.getElementById("block-" + obj.mid).style.display = "block";
    });
});

// =============================================== CINEMA =============================================== \\

// Make Cinema block \\
let cinemaBlock = '';
ls_cinemaData.map((cinema, index) => {
    if (index < 6) {
        cinemaBlock += '\
        <a href onclick="cinemaRedirect(' + cinema.cid + ')" class="block" id="block-' + cinema.cid + '">\
            <h5>' + cinema.name + '</h5>\
            <img src="../assets/images/' + cinema.image + '">\
        </a>';
    }
    document.getElementById("cinemaDisplay").innerHTML = cinemaBlock;
});

// =============================================== MOVIE =============================================== \\

// Make Movie block \\
let movieBlock = '';
f_movieDataArray.map((movieObj, index) => {
    if (index < 6) {
        movieBlock += '\
        <a href onclick="movieRedirect(' + movieObj.mid + ')" class="block" id="block-' + movieObj.mid + '">\
            <h5>' + movieObj.name + '</h5>\
            <img src="../assets/images/' + movieObj.image + '">\
        </a>';
    }
    document.getElementById("movieDisplay").innerHTML = movieBlock;
});