// ===== Form Validation With All Input ===== \\

const validation = (ref_formfield, info_valid, ls_userData) => {
    ref_formfield.forEach((field) => {
        if (field.value === '') {
            field.nextElementSibling.innerHTML = "This feild is required.";
            field.parentElement.classList.add("invalid");
            info_valid = false;
        } else {
            field.nextElementSibling.innerHTML = '';
            field.parentElement.classList.remove("invalid");

            let ref_fieldId = field.getAttribute("id");
            if (ref_fieldId === 'userName') {
                if (!/^(?=.{2,}$)[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(field.value)) {
                    field.nextElementSibling.innerHTML = "Please enter valid name.";
                    field.parentElement.classList.add("invalid");
                    info_valid = false;
                }
            }

            if (ref_fieldId === 'name') {
                if (!/^(?=.{2,}$)[A-Za-z0-9-.]+(?:\s[A-Za-z0-9-.]+)*$/.test(field.value)) {
                    field.nextElementSibling.innerHTML = "Please enter valid name.";
                    field.parentElement.classList.add("invalid");
                    info_valid = false;
                }
            }

            if (ref_fieldId === 'email') {
                if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i.test(field.value)) {
                    field.nextElementSibling.innerHTML = "Please enter valid email address.";
                    field.parentElement.classList.add("invalid");
                    info_valid = false;
                } else if (ls_userData) {
                    let fEmailData = ls_userData.filter((dataObj) => dataObj.email === field.value);
                    if (fEmailData.length === 0 && field.value !== 'admin@gmail.com') {
                        field.nextElementSibling.innerHTML = "Please enter your registered email address.";
                        field.parentElement.classList.add("invalid");
                        info_valid = false;
                    }
                }
            }

            if (ref_fieldId === 'pass') {
                if (!/^.{8,}$/.test(field.value)) {
                    field.nextElementSibling.innerHTML = "Your password must contain at least eight letters.";
                    field.parentElement.classList.add("invalid");
                    info_valid = false;
                } else if (ls_userData) {
                    let fPassData = ls_userData.filter((dataObj) => dataObj.pass === field.value);
                    if (fPassData.length === 0 && field.value !== '12345Admin') {
                        field.nextElementSibling.innerHTML = "Please enter correct password.";
                        field.parentElement.classList.add("invalid");
                        info_valid = false;
                    }
                }
            }

            if (ref_fieldId === 'location') {
                if (!/^[a-zA-Z0-9\s.,&'-]{2,}$/.test(field.value)) {
                    field.nextElementSibling.innerHTML = "Please enter valid location.";
                    field.parentElement.classList.add("invalid");
                    info_valid = false;
                }
            }
            if (ref_fieldId === 'movieTime') {
                if (!/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/.test(field.value)) {
                    field.nextElementSibling.innerHTML = "The Time should match to 00:00 formate.";
                    field.parentElement.classList.add("invalid");
                    info_valid = false;
                }
            }
        }
    });
    return info_valid;
};

// ===== Password hide and show ===== \\
let ref_passBtn = document.getElementById("passHideShow");
const showPass = () => {
    ref_passBtn.setAttribute("onclick", 'hidePass()');
    ref_passBtn.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
    ref_passBtn.nextElementSibling.setAttribute("type", "text");
}
const hidePass = () => {
    ref_passBtn.setAttribute("onclick", 'showPass()');
    ref_passBtn.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
    ref_passBtn.nextElementSibling.setAttribute("type", "password");
}
let ref_passInput = document.getElementById("pass");
if (ref_passInput) {
    ref_passInput.addEventListener("focus", function () {
        hidePass();
    });
}


// ===== Date input placeholder and icon ===== \\
let ref_dob = document.getElementById("dob");
if (ref_dob) {
    ref_dob.addEventListener("focus", function () {
        if (ref_dob.value === '') {
            ref_dob.setAttribute("type", "date");
        }
    });
    ref_dob.addEventListener("blur", function () {
        if (ref_dob.value !== '') {
            ref_dob.setAttribute("type", "date");
        } else {
            ref_dob.setAttribute("type", "text");
        }
    });
}

// ===== Time input placeholder and icon ===== \\
let ref_time = document.getElementById("time");
if (ref_time) {
    ref_time.addEventListener("focus", function () {
        if (ref_time.value === '') {
            ref_time.setAttribute("type", "time");
        }
    });
    ref_time.addEventListener("blur", function () {
        if (ref_time.value !== '') {
            ref_time.setAttribute("type", "time");
        } else {
            ref_time.setAttribute("type", "text");
        }
    });
}

let ref_movieTime = document.getElementById("movieTime");
if(ref_movieTime) {
    ref_movieTime.addEventListener("focus", function () {
        if (ref_movieTime.value === '') {
            ref_movieTime.setAttribute("placeholder", "00:00");
        }
    });
    ref_movieTime.addEventListener("blur", function () {
        if (ref_movieTime.value === "") {
            ref_movieTime.setAttribute("placeholder", "Time Limit");
        }
    });
}

// ===== Admin - date input placeholder and icon ===== \\

let ref_date = document.getElementById("releaseData");
if (ref_date) {
    ref_date.addEventListener("focus", function () {
        if (ref_date.value === '') {
            ref_date.setAttribute("type", "date");
        }
    });
    ref_date.addEventListener("blur", function () {
        if (ref_date.value !== '') {
            ref_date.setAttribute("type", "date");
        } else {
            ref_date.setAttribute("type", "text");
        }
    });
}

// ===== Admin - add data form open and close ===== \\
let ref_addHeaderBtn = document.getElementById("addHeaderBtn");
if (ref_addHeaderBtn) {
    ref_addHeaderBtn.addEventListener("click", function () {
        document.getElementById("addFormInner").style.display = "block";
        document.body.classList.add("scroll_hide");

        let ref_movieBody = document.getElementById("movie");
        if (ref_movieBody) {
            ref_time.setAttribute("type", "text");
        }
    });
}
let ref_closeBtn = document.getElementById("closeBtn");
if (ref_closeBtn) {
    ref_closeBtn.addEventListener("click", function () {
        document.getElementById("addFormInner").style.display = "none";
        document.body.classList.remove("scroll_hide");

        let ref_movieBody = document.getElementById("movie");
        if (ref_movieBody) {
            removeTimeInput();
        }
        let ref_cinemaBody = document.getElementById("cinema");
        if(ref_cinemaBody) {
            ref_name.value = '';
            ref_location.value = '';
            ref_facilities.value = '';
            ref_formTitle.innerHTML = "Add Cinema";
            ref_formBtn.value = "Add +";
            ref_dyMovieImg.setAttribute("src", "");
            ref_img.classList.remove("img_founded");
        }
        let ref_seatBody = document.getElementById("seat");
        if(ref_seatBody) {
            ref_cinemaSelect.value = '';
            ref_movieSelect.value = '';
            ref_timeSelect.value = '';
            ref_seats.value = '';
            ref_price.value = '';
            ref_movieSelect.disabled = true;
            ref_timeSelect.disabled = true;
            ref_formTitle.innerHTML = "Add Seats";
            ref_formBtn.value = "Add +";
            update = false;
            idforDataUpdate = null;
        }
    });
}

// ===== Admin - change file input text when it has value ===== \\
let ref_movieImage = document.getElementById("movieImage");
let ref_dyMovieImg = document.getElementById('dyMovieImg');
if (ref_movieImage) {
    ref_movieImage.onchange = function () {
        if (ref_movieImage.value) {
            this.classList.add("img_founded");
        } else {
            this.classList.remove("img_founded");
        }
        if (ref_dyMovieImg) {
            ref_dyMovieImg.setAttribute("src", "../assets/images/" + ref_movieImage.files[0].name);
        }
    }
}

// ===== Admin - Make cinema Drop-down ===== \\
const cinemaDropDown = (ref_cinemaSelect) => {
    let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));
    if (ls_cinemaData) {
        ls_cinemaData.map((cinemaData) => {
            let option = document.createElement("option");
            option.setAttribute("value", cinemaData.cid);
            let optionText = document.createTextNode(cinemaData.name);
            option.appendChild(optionText);
            ref_cinemaSelect.appendChild(option);
        });
    }
}

// ===== Remove double movie data ===== \\
let movieDataArray = [];
const filterdMovieData = () => {
    let ls_movieData = JSON.parse(localStorage.getItem("_movieData"));
    if (ls_movieData) {
        ls_movieData.map((obj) => {
            if(movieDataArray.length === 0) {
                movieDataArray.push(obj);
            } else {
                let fData = movieDataArray.filter((fObj) => fObj.name === obj.name);
                if(fData.length === 0) {
                    movieDataArray.push(obj);
                }
            }
        });
    }
    return movieDataArray;
}

// ===== Redirect the page after clicking on Cinema ===== \\
const cinemaRedirect = (blockId) => {
    sessionStorage.setItem("_redirectedCinemaId", JSON.stringify(blockId));
    window.location = "../user/cinema.html";

    event.preventDefault();
}
// ===== redirectedCinemaId is set null when user go on cinema page without click on cinema block ===== \\
if (window.location.pathname != "/project/movie/user/cinema.html") {
    sessionStorage.setItem("_redirectedCinemaId", JSON.stringify(null));
}

// ===== Redirect the page after clicking on Movie ===== \\
const movieRedirect = (blockId) => {
    sessionStorage.setItem("_redirectedMovieId", JSON.stringify(blockId));
    window.location = "../user/movie.html";

    event.preventDefault();
}
// ===== redirectedMovieId is set null when user go on movie page without click on movie block ===== \\
if (window.location.pathname != "/project/movie/user/movie.html") {
    sessionStorage.setItem("_redirectedMovieId", JSON.stringify(null));
}