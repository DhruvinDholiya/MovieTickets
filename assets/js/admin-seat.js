let ref_cinemaSelect = document.getElementById("cinemaSelect");
let ref_movieSelect = document.getElementById("movieSelect");
let ref_timeSelect = document.getElementById("timeSelect");
let ref_seats = document.getElementById("seats");
let ref_price = document.getElementById("price");
let ref_formTitle = document.querySelector("#addForm h2");
let ref_formBtn = document.querySelector("#addForm input[type = 'submit']");
let seatData = [];
let update = false;
let idforDataUpdate = null;

// This function called from common.js 
window.onload = cinemaDropDown(ref_cinemaSelect);

let ls_movieData = JSON.parse(localStorage.getItem("_movieData"));
const movieOfCinema = () => {
    ref_movieSelect.disabled = false;
    let cid = parseInt(ref_cinemaSelect.value);
    if (ls_movieData) {
        let display = "<option value=''>Select Movie</option>";
        ref_movieSelect.innerHTML = display;
        ls_movieData.map((obj) => {
            if (obj.cid === cid) {
                console.log(obj.cid, cid);
                display += "<option value=" + obj.mid + ">" + obj.name + "</option>";
                ref_movieSelect.innerHTML = display;
            }
        });
    };
}
ref_cinemaSelect.addEventListener("change", movieOfCinema);

const timeOfShow = () => {
    ref_timeSelect.disabled = false;
    let mid = parseInt(ref_movieSelect.value);
    if (ls_movieData) {
        let display = "<option value=''>Select Show's Time</option>";
        ls_movieData.map((obj) => {
            if (obj.mid === mid) {
                obj.time.map((time) => {
                    display += "<option value=" + time + ">" + time + "</option>";
                    ref_timeSelect.innerHTML = display;
                });

            }
        });
    };
}
ref_movieSelect.addEventListener("change", timeOfShow);

const seatOfShow = () => {
    ref_seats.disabled = false;
}
ref_timeSelect.addEventListener("change", seatOfShow);


const handleRemove = (sid) => {
    document.getElementById("sid-" + sid).remove();

    seatData.map((seatObj, index) => {
        if (seatObj.sid === sid) {
            seatData.splice(index, 1);
        }
    });

    localStorage.setItem("_seatData", JSON.stringify(seatData));

    update = false;
    idforDataUpdate = null;
}

const sendDataForUpdate = (sid) => {
    document.getElementById("addFormInner").style.display = "block";
    document.body.classList.add("scroll_hide");

    update = true;
    let fSeatData = seatData.filter((seatObj) => seatObj.sid === sid)[0];

    ref_cinemaSelect.value = fSeatData.cid;
    movieOfCinema();
    ref_movieSelect.value = fSeatData.mid;
    timeOfShow();
    ref_timeSelect.value = fSeatData.time;
    seatOfShow();
    ref_seats.value = fSeatData.seats.length;
    ref_price.value = fSeatData.price;

    ref_formTitle.innerHTML = "Update Seats";
    ref_formBtn.value = "Update";

    idforDataUpdate = sid;
}

const handleUpdate = () => {
    let fSeatData = seatData.filter((seatData) => seatData.sid === idforDataUpdate)[0];
    fSeatData.cid = parseInt(ref_cinemaSelect.value);
    fSeatData.mid = parseInt(ref_movieSelect.value);
    fSeatData.time = ref_timeSelect.value;
    fSeatData.price = parseInt(ref_price.value);

    data_seats = ref_seats.value;
    let seatZeroArray = [];
    for (i = 1; i <= data_seats; i++) {
        seatZeroArray.push(0);
    }
    fSeatData.seats = seatZeroArray;

    localStorage.setItem("_seatData", JSON.stringify(seatData));


    let ref_tdForUpdate = document.getElementById("sid-" + idforDataUpdate).children;

    let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));
    ls_cinemaData.map((obj) => {
        if (obj.cid === parseInt(ref_cinemaSelect.value)) {
            ref_tdForUpdate[1].innerHTML = obj.name;
        }
    });

    let ls_movieData = JSON.parse(localStorage.getItem("_movieData"));
    ls_movieData.map((obj) => {
        if (obj.mid === parseInt(ref_movieSelect.value)) {
            ref_tdForUpdate[2].innerHTML = obj.name;
        }
    });
    ref_tdForUpdate[3].innerHTML = ref_timeSelect.value;
    ref_tdForUpdate[4].innerHTML = ref_seats.value;
    ref_tdForUpdate[5].innerHTML =  "&#x20B9" + ' ' + ref_price.value;

    ref_cinemaSelect.value = '';
    ref_movieSelect.value = '';
    ref_timeSelect.value = '';
    ref_seats.value = '';
    ref_price.value = '';
    update = false;
    idforDataUpdate = null;

    event.preventDefault();
}

const makeSeatTable = (cid, mid, data_time, data_seats, data_price, sid) => {
    let tr = document.createElement("tr");
    tr.setAttribute("id", "sid-" + sid);

    let ref_thCount = document.querySelectorAll(".data_part th");
    for (let tdCount = 1; tdCount <= ref_thCount.length; tdCount++) {
        let td = document.createElement("td");
        if (tdCount === 1) {
            td.innerHTML = "#" + sid;
        } else if (tdCount === 2) {
            let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));
            ls_cinemaData.map((obj) => {
                if (obj.cid === cid) {
                    td.innerHTML = obj.name;
                }
            });
        } else if (tdCount === 3) {
            let ls_movieData = JSON.parse(localStorage.getItem("_movieData"));
            ls_movieData.map((obj) => {
                if (obj.mid === mid) {
                    td.innerHTML = obj.name;
                }
            });
        } else if (tdCount === 4) {
            td.innerHTML = data_time;
        } else if (tdCount === 5) {
            td.innerHTML = data_seats;
        } else if (tdCount === 6) {
            td.innerHTML = "&#x20B9" + ' ' + data_price;
        } else if (tdCount === 7) {
            let editBtn = document.createElement("button");
            editBtn.setAttribute("onclick", "sendDataForUpdate(" + sid + ")");
            editBtn.innerHTML = "<i class='fas fa-edit'></i>";
            td.appendChild(editBtn);

            let removeBtn = document.createElement("button");
            removeBtn.setAttribute("onclick", "handleRemove(" + sid + ")");
            removeBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
            td.appendChild(removeBtn);
        }

        tr.appendChild(td);
    }
    document.getElementById("dataTable").appendChild(tr);

    let seatZeroArray = [];
    for (i = 1; i <= data_seats; i++) {
        seatZeroArray.push(0);
    }
    let seatObj = {
        "sid": sid,
        "cid": cid,
        "mid": mid,
        "time": data_time,
        "seats": seatZeroArray,
        "price": data_price
    };
    seatData.push(seatObj);

    localStorage.setItem("_seatData", JSON.stringify(seatData));
}

const printSeatData = () => {
    let ls_seatData = JSON.parse(localStorage.getItem("_seatData"));
    if (ls_seatData) {
        ls_seatData.map((obj) => {
            makeSeatTable(obj.cid, obj.mid, obj.time, obj.seats.length, obj.price, obj.sid);
        });
    }
}
window.onload = printSeatData();

const handleAddSeat = () => {
    let cid = parseInt(ref_cinemaSelect.value);
    let mid = parseInt(ref_movieSelect.value);
    let data_time = ref_timeSelect.value;
    let data_seats = ref_seats.value;
    let data_price = parseInt(ref_price.value);
    let sid = Math.floor(Math.random() * 1000);

    makeSeatTable(cid, mid, data_time, data_seats, data_price, sid);

    ref_cinemaSelect.value = '';
    ref_movieSelect.value = '';
    ref_timeSelect.value = '';
    ref_seats.value = '';
    ref_price.value = '';

    event.preventDefault();
}

const forTakeDecision = () => {
    if (update) {
        handleUpdate();
    } else {
        handleAddSeat();
    }

    document.getElementById("addFormInner").style.display = "none";
    document.body.classList.remove("scroll_hide");
    ref_movieSelect.disabled = true;
    ref_timeSelect.disabled = true;
    ref_formTitle.innerHTML = "Add Seats";
    ref_formBtn.value = "Add +";
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