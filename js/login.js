// ================================ Login =================================
const username = document.getElementById("username");
const password = document.getElementById("password");
const login = document.getElementById("login");
const idloginError = document.getElementById("idloginError");


const userLogin = async () => {
    // Check if username and password is correct  
    let link = "http://localhost:3500/login";
    data =
    {
        "username": username.value,
        "password": password.value
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
    if (resp === "failed") {
        idloginError.style.display = "block";
        username.style.border = "1px red solid";
        password.style.border = "1px red solid";
    } else {
        idloginError.style.display = "none";
        location.href = "create_events.html";

    }

}

login.addEventListener('click', userLogin);
