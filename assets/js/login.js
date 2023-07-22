let ref_loginForm = document.getElementById("loginForm");
const handleLogin = () => {
    let info_valid = true;
    let ls_userData = JSON.parse(localStorage.getItem("_userData"));
    let ref_loginFormfield = ref_loginForm.querySelectorAll("#loginForm .inputField input");

    // This function called from common.js  
    info_valid = validation(ref_loginFormfield, info_valid, ls_userData,);

    let ref_email = document.getElementById("email");
    let ref_pass = document.getElementById("pass");

    if (info_valid === true) {
        if (ref_email.value === "admin@gmail.com" && ref_pass.value === "12345Admin") {
            window.location = "../movie/admin/admin-cinema.html";
        } else if (ls_userData) {
            let f_userData = ls_userData.filter((user) => ref_email.value === user.email && ref_pass.value === user.pass);
            if(f_userData.length > 0) {
                localStorage.setItem("_logedInUser", JSON.stringify(f_userData));
                window.location = "../movie/user/user-home.html";
            }
        }
    }
    event.preventDefault();
}

ref_loginForm.addEventListener("submit", handleLogin);