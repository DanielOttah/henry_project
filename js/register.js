const newUser = document.getElementById("new_user_username");
const reg_password1 = document.getElementById("reg_password1");
const reg_password2 = document.getElementById("reg_password2");
const id_Register_Error = document.getElementById("id_Register_Error");
const register_newUser = document.getElementById("register_newUser");
const registerError = document.getElementById("registerError");

const newUser_Registration = async () => {
    if (reg_password1.value !== reg_password2.value) {
        id_Register_Error.style.display = "block";
    }
    else {
        id_Register_Error.style.display = "none";
        let link = "http://localhost:3500/register";
        data =
        {
            "username": newUser.value,
            "password": reg_password2.value
        }
        let response = await fetch(link, {
            method: 'POST',     // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',       // no-cors, *cors, same-origin
            cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',         // manual, *follow, error
            referrer: 'no-referrer',    // no-referrer, *client
            body: JSON.stringify(data)  // body data type must match "Content-Type" header
        });
        let resp = await response.json();
        if (resp === "registration successful") {
            location.href = "index.html";
        }
        else {
            registerError.style.display = "block";
        }
        // console.log(resp);
    }
}

register_newUser.addEventListener('click', newUser_Registration);
