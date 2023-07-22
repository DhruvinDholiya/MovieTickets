let ref_cinemaSelect = document.getElementById("cinemaSelect");
// This function called from common.js 
window.onload = cinemaDropDown(ref_cinemaSelect);

let ref_name = document.getElementById("name");
let ref_description = document.getElementById("description");
let ref_cinema = document.getElementById("cinemaSelect");
let ref_timeInput = document.getElementsByName("show-time");
let ref_img = document.getElementById("movieImage");
let movieData = [];
let data_time = [];
let timeRowId = [];
let update = false;
let idforDataUpdate = null;

const handleRemove = (mid) => {
    document.getElementById("mid-" + mid).remove();

    movieData.map((movieObj, index) => {
        if (movieObj.mid === mid) {
            movieData.splice(index, 1);
        }
    });
    localStorage.setItem("_movieData", JSON.stringify(movieData));

    update = false;
    idforDataUpdate = null;

}

const sendDataForUpdate = (mid) => {
    document.body.classList.add("scroll_hide");
    document.getElementById("addFormInner").style.display = "flex";
    update = true;

    let fMovieData = movieData.filter((movieObj) => movieObj.mid === mid);
    ref_name.value = fMovieData[0].name;
    ref_description.value = fMovieData[0].description;
    ref_cinema.value = fMovieData[0].cid;


    document.getElementById("time").setAttribute("type", "time");
    for (let i = 0; i <= (fMovieData[0].time.length) - 2; i++) {
        addNewRow(1);
    }
    for (let j = 0; j < ref_timeInput.length; j++) {
        for (let k = 0; k < fMovieData[0].time.length; k++) {
            if (j === k) {
                ref_timeInput[j].value = fMovieData[0].time[k];
            }
        }
    }
    ref_img.classList.add("img_founded");
    ref_dyMovieImg.setAttribute("src", "../assets/images/" + fMovieData[0].image);

    idforDataUpdate = mid;
}

const handleUpdate = () => {

    let updatMovieData = movieData.filter((movieData) => movieData.mid === idforDataUpdate);
    updatMovieData[0].name = ref_name.value;
    updatMovieData[0].description = ref_description.value;
    updatMovieData[0].cid = parseInt(ref_cinema.value);

    let data_cinema = '';
    let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));
    ls_cinemaData.map((obj) => {
        if (obj.cid === parseInt(ref_cinema.value)) {
            data_cinema = obj.name;
        }
    });
    updatMovieData[0].cinema = data_cinema;

    data_time = [];
    ref_timeInput.forEach((input) => {
        data_time.push(input.value);
    });
    updatMovieData[0].time = data_time;
    updatMovieData[0].image = ref_img.files[0].name;

    localStorage.setItem("_movieData", JSON.stringify(movieData));

    let ref_tdForUpdate = document.getElementById("mid-" + idforDataUpdate).children;
    ref_tdForUpdate[1].innerHTML = ref_name.value;
    ref_tdForUpdate[2].innerHTML = ref_description.value;
    ref_tdForUpdate[3].innerHTML = data_cinema;

    let timeBlock = "<ul id='listBlock'>";
    data_time.map((time) => {
        timeBlock += "<li>" + time + "</li>";
    });
    timeBlock += "</ul>";
    ref_tdForUpdate[4].innerHTML = timeBlock;
    ref_tdForUpdate[5].innerHTML = '<img src=../assets/images/' + ref_img.files[0].name + '>';

    ref_name.value = '';
    ref_description.value = '';
    ref_cinema.value = '';
    ref_time.value = '';
    ref_img.classList.remove("img_founded");
    update = false;
    idforDataUpdate = null;

    event.preventDefault();
}

const makeMovieTable = (data_name, data_description, data_cinema, data_time, data_img, mid, cid) => {

    let tr = document.createElement("tr");
    tr.setAttribute("id", "mid-" + mid);

    let ref_thCount = document.querySelectorAll(".data_part th");
    for (let tdCount = 1; tdCount <= ref_thCount.length; tdCount++) {
        let td = document.createElement("td");
        if (tdCount === 1) {
            td.innerHTML = "#" + mid;
        } else if (tdCount === 2) {
            td.innerHTML = data_name;
        } else if (tdCount === 3) {
            td.innerHTML = data_description;
        } else if (tdCount === 4) {
            td.innerHTML = data_cinema;
        } else if (tdCount === 5) {
            let timeBlock = "<ul id='listBlock'>";
            data_time.map((time) => {
                timeBlock += "<li>" + time + "</li>";
            });
            timeBlock += "</ul>";
            td.innerHTML = timeBlock;
        } else if (tdCount === 6) {
            td.innerHTML = '<img src=../assets/images/' + data_img + '>';
        } else if (tdCount === 7) {
            let editBtn = document.createElement("button");
            editBtn.setAttribute("onclick", "sendDataForUpdate(" + mid + ")");
            editBtn.innerHTML = "<i class='fas fa-edit'></i>";
            td.appendChild(editBtn);

            let removeBtn = document.createElement("button");
            removeBtn.setAttribute("onclick", "handleRemove(" + mid + ")");
            removeBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
            td.appendChild(removeBtn);
        }
        tr.appendChild(td);
    }

    document.getElementById("dataTable").appendChild(tr);

    let movieObj = {
        "name": data_name,
        "description": data_description,
        "cinema": data_cinema,
        "time": data_time,
        "image": data_img,
        "mid": mid,
        "cid": cid
    };

    movieData.push(movieObj);
    localStorage.setItem("_movieData", JSON.stringify(movieData));
}

const printMovieData = () => {
    let ls_movieData = JSON.parse(localStorage.getItem("_movieData"));
    if (ls_movieData) {
        ls_movieData.map((lsArrayObj) => {
            makeMovieTable(lsArrayObj.name, lsArrayObj.description, lsArrayObj.cinema, lsArrayObj.time, lsArrayObj.image, lsArrayObj.mid, lsArrayObj.cid);
        });
    }
}
window.onload = printMovieData();

const handleAddMovie = () => {
    let data_name = ref_name.value;
    let data_description = ref_description.value;

    let cid = parseInt(ref_cinema.value);
    let data_cinema = '';
    let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));
    ls_cinemaData.map((obj) => {
        if (obj.cid === cid) {
            data_cinema = obj.name;
        }
    });

    data_time = [];
    ref_timeInput.forEach((input) => {
        data_time.push(input.value);
    });

    let data_img = ref_img.files[0].name;
    let mid = Math.floor(Math.random() * 1000);

    makeMovieTable(data_name, data_description, data_cinema, data_time, data_img, mid, cid);

    ref_name.value = '';
    ref_description.value = '';
    ref_cinema.value = '';
    ref_time.value = '';
    ref_img.classList.remove("img_founded");

    event.preventDefault();
}

const forTakeDecision = () => {
    if (update) {
        handleUpdate();
    } else {
        handleAddMovie();
    }

    if (ref_timeInput.length > 1) {
        removeTimeInput();
    }
    timeRowId = [];
    localStorage.setItem("_timeRowId", JSON.stringify(timeRowId));

    document.getElementById("addFormInner").style.display = "none";
    document.body.classList.remove("scroll_hide");
    event.preventDefault();
}

let ref_addForm = document.getElementById("addForm");
const checkValidation = () => {

    let info_valid = true;
    let ref_addFormField = ref_addForm.querySelectorAll(".inputField > :first-child");

    // This function called from common.js 
    info_valid = validation(ref_addFormField, info_valid);

    if (info_valid) {
        forTakeDecision();
    }
    event.preventDefault();
}
ref_addForm.addEventListener("submit", checkValidation);

let firstRow = 0;
const addNewRow = (firstRow) => {
    if (firstRow === 1) {
        document.getElementById("dyTimeRow").setAttribute("class", "align_row set_input");
    }

    let randomNum = (Math.random(Math.floor) * 1000).toFixed(0);
    timeRowId.push(randomNum);
    localStorage.setItem("_timeRowId", JSON.stringify(timeRowId));

    let div = document.createElement("div");
    div.setAttribute("id", "row-" + randomNum);
    div.setAttribute("class", "inputField");

    let timeField = document.createElement("input");
    timeField.setAttribute("type", "time");
    timeField.setAttribute("name", "show-time");
    timeField.setAttribute("placeholder", "Time");
    div.appendChild(timeField);

    let span = document.createElement("span")
    div.appendChild(span);

    let divBtn = document.createElement("div");
    divBtn.setAttribute("class", "btn_align");
    div.appendChild(divBtn);

    let plusBtn = document.createElement("button");
    plusBtn.setAttribute("onclick", "addNewRow()");
    plusBtn.setAttribute("type", "button");
    let plusTxt = document.createTextNode("+");
    plusBtn.appendChild(plusTxt);
    divBtn.appendChild(plusBtn);

    let minusbtn = document.createElement("button");
    minusbtn.setAttribute("onclick", "removeRow(" + randomNum + ")");
    minusbtn.setAttribute("type", "button");
    let minusTxt = document.createTextNode("-");
    minusbtn.appendChild(minusTxt);
    divBtn.appendChild(minusbtn);

    document.getElementById("dyTimeRow").appendChild(div);
}

const removeRow = (randomNum) => {
    document.getElementById("row-" + randomNum).remove();

    let ls_timeRowId = JSON.parse(localStorage.getItem("_timeRowId"));
    ls_timeRowId.map((id, index) => {
        if (parseInt(id) === randomNum) {
            timeRowId.splice(index, 1);
        }
    });
    localStorage.setItem("_timeRowId", JSON.stringify(timeRowId));

    let ref_timeRow = document.getElementById("dyTimeRow").children;
    if (ref_timeRow.length === 1) {
        document.getElementById("dyTimeRow").setAttribute("class", "align_row");
    }
}

// remove new time input on close and on submit //
const removeTimeInput = () => {
    let ls_movieData = JSON.parse(localStorage.getItem("_timeRowId"));

    if (ls_movieData) {
        ls_movieData.map((timeRowId) => {
            let get_timeInput = document.getElementById("row-" + timeRowId);
            if (get_timeInput) {
                get_timeInput.remove();
            }
        });
    }

    timeRowId = [];
    localStorage.setItem("_timeRowId", JSON.stringify(timeRowId));

    ref_time.setAttribute("type", "text");
    document.getElementById("dyTimeRow").setAttribute("class", "align_row");

    ref_name.value = '';
    ref_description.value = '';
    ref_cinema.value = '';
    ref_time.value = '';
    ref_img.classList.remove("img_founded");
}