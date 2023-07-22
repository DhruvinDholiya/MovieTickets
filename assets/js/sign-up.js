let ref_signUpForm = document.getElementById("signUpForm");
let userData = [];

let ls_userData = JSON.parse(localStorage.getItem("_userData"));
if (ls_userData) {
    ls_userData.map((value) => {
        userData.push(value);
    });
}

const handlesignUp = (event) => {
    let ref_userFormfield = ref_signUpForm.querySelectorAll("#signUpForm .inputField input");
    let info_valid = true;
    let ls_userData = null;

    // This function called from common.js  
    info_valid = validation(ref_userFormfield, info_valid, ls_userData);

    if (info_valid === true) {

        let data_uid = (Math.random(Math.floor) * 10000).toFixed(0);
        let data_name = document.getElementById("userName").value;
        let data_email = document.getElementById("email").value;
        let data_pass = document.getElementById("pass").value;
        let data_dob = document.getElementById("dob").value;

        let obj_userData = {
            "uid": "user-" + data_uid,
            "name": data_name,
            "email": data_email,
            "pass": data_pass,
            "dob": data_dob
        }

        userData.push(obj_userData);
        localStorage.setItem("_userData", JSON.stringify(userData));
        alert("you are successfully registration.")
        window.location = "../login.html";
    }

    event.preventDefault();
}

ref_signUpForm.addEventListener("submit", handlesignUp);

