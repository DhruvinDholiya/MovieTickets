let ref_name = document.getElementById("name");
let ref_location = document.getElementById("location");
let ref_facilities = document.getElementById("facilities");
let ref_formTitle = document.querySelector("#addForm h2");
let ref_img = document.getElementById("movieImage");
let ref_formBtn = document.querySelector("#addForm input[type = 'submit']");
let cinemaData = [];
let update = false;
let idforDataUpdate = null;

const handleRemove = (cid) => {
    document.getElementById("cid-" + cid).remove();

    cinemaData.map((cinemaObj, index) => {
        if (cinemaObj.cid === cid) {
            cinemaData.splice(index, 1);
        }
    });

    localStorage.setItem("_cinemaData", JSON.stringify(cinemaData));

    update = false;
    idforDataUpdate = null;
}

const sendDataForUpdate = (cid) => {
    document.getElementById("addFormInner").style.display = "block";
    document.body.classList.add("scroll_hide");

    update = true;
    let fCinemaData = cinemaData.filter((cinemaObj) => cinemaObj.cid === cid);

    ref_name.value = fCinemaData[0].name;
    ref_location.value = fCinemaData[0].location;
    ref_facilities.value = fCinemaData[0].facilities;
    ref_img.classList.add("img_founded");
    ref_dyMovieImg.setAttribute("src", "../assets/images/" + fCinemaData[0].image);

    ref_formTitle.innerHTML = "Update Cinema";
    ref_formBtn.value = "Update";

    idforDataUpdate = cid;
}

const handleUpdate = () => {
    let updatCinemaData = cinemaData.filter((cinemaObj) => cinemaObj.cid === idforDataUpdate);
    updatCinemaData[0].name = ref_name.value;
    updatCinemaData[0].location = ref_location.value;
    updatCinemaData[0].facilities = ref_facilities.value.split(", ");
    updatCinemaData[0].image = ref_img.files[0].name;

    localStorage.setItem("_cinemaData", JSON.stringify(cinemaData));

    let ref_tdForUpdate = document.getElementById("cid-" + idforDataUpdate).children;

    ref_tdForUpdate[1].innerHTML = ref_name.value;
    ref_tdForUpdate[2].innerHTML = ref_location.value;

    let facilitiesBlock = "<ul id='listBlock'>";
    updatCinemaData[0].facilities.map((facilities) => {
        facilitiesBlock += "<li>" + facilities + "</li>";
    });
    facilitiesBlock += "</ul>";
    ref_tdForUpdate[3].innerHTML = facilitiesBlock;
    ref_tdForUpdate[4].innerHTML = '<img src=../assets/images/' + ref_img.files[0].name + '>';

    ref_name.value = '';
    ref_location.value = '';
    ref_facilities.value = '';
    ref_dyMovieImg.setAttribute("src", "");
    ref_img.classList.remove("img_founded");
    update = false;
    idforDataUpdate = null;

    event.preventDefault();
}

const makeCinemaTable = (data_name, data_location, data_facilities, data_img, cid) => {
    let tr = document.createElement("tr");
    tr.setAttribute("id", "cid-" + cid);

    let ref_thCount = document.querySelectorAll(".data_part th");
    for (let tdCount = 1; tdCount <= ref_thCount.length; tdCount++) {
        let td = document.createElement("td");
        if (tdCount === 1) {
            td.innerHTML = "#" + cid;
        } else if (tdCount === 2) {
            td.innerHTML = data_name;
        } else if (tdCount === 3) {
            td.innerHTML = data_location;
        } else if (tdCount === 4) {
            let facilitiesBlock = "<ul id='listBlock'>";
            data_facilities.map((facilities) => {
                facilitiesBlock += "<li>" + facilities + "</li>";
            });
            facilitiesBlock += "</ul>";
            td.innerHTML = facilitiesBlock;
        } else if (tdCount === 5) {
            td.innerHTML = '<img src=../assets/images/' + data_img + '>';
        } else if (tdCount === 6) {
            let editBtn = document.createElement("button");
            editBtn.setAttribute("onclick", "sendDataForUpdate(" + cid + ")");
            editBtn.innerHTML = "<i class='fas fa-edit'></i>";
            td.appendChild(editBtn);

            let removeBtn = document.createElement("button");
            removeBtn.setAttribute("onclick", "handleRemove(" + cid + ")");
            removeBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
            td.appendChild(removeBtn);
        }

        tr.appendChild(td);
    }

    document.getElementById("dataTable").appendChild(tr);

    let cinemaObj = {
        "name": data_name,
        "location": data_location,
        "facilities": data_facilities,
        "image": data_img,
        "cid": cid
    };
    cinemaData.push(cinemaObj);

    localStorage.setItem("_cinemaData", JSON.stringify(cinemaData));
}

const printCinemaData = () => {
    let ls_cinemaData = JSON.parse(localStorage.getItem("_cinemaData"));
    if (ls_cinemaData) {
        ls_cinemaData.map((lsArrayObj) => {
            makeCinemaTable(lsArrayObj.name, lsArrayObj.location, lsArrayObj.facilities, lsArrayObj.image, lsArrayObj.cid);
        });
    }
}
window.onload = printCinemaData();

const handleAddCinema = () => {
    let data_name = ref_name.value;
    let data_location = ref_location.value;
    let data_facilities = ref_facilities.value.split(", ");

    let data_img = ref_img.files[0].name;
    let cid = Math.floor(Math.random() * 1000);

    makeCinemaTable(data_name, data_location, data_facilities, data_img, cid);

    ref_name.value = '';
    ref_location.value = '';
    ref_facilities.value = '';
    ref_img.classList.remove("img_founded");

    event.preventDefault();
}

const forTakeDecision = () => {
    if (update) {
        handleUpdate();
    } else {
        handleAddCinema();
    }

    document.getElementById("addFormInner").style.display = "none";
    document.body.classList.remove("scroll_hide");
    ref_formTitle.innerHTML = "Add Cinema";
    ref_formBtn.value = "Add +";
    event.preventDefault();
}

let ref_addForm = document.getElementById("addForm");
const checkValidation = () => {

    let info_valid = true;
    let ref_addFormField = ref_addForm.querySelectorAll(".inputField input");

    // This function called from common.js 
    info_valid = validation(ref_addFormField, info_valid);

    if (info_valid) {
        forTakeDecision();
    }
    event.preventDefault();
}
ref_addForm.addEventListener("submit", checkValidation);