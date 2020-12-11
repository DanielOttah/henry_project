const nameCard = document.getElementById("nameCard");
const vote_photographer = document.getElementById("vote_photographer");
const votingError = document.getElementById("votingError");
const photographers_Dropdown = document.getElementById("photographers_Dropdown");

let acc = document.getElementsByClassName("accordion");
let i;

window.addEventListener('click', (e) => {
    if (e.target.tagName == "BUTTON" && e.target.className.includes("accordion")) {
        e.target.classList.toggle("active");
        let panel = e.target.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }

})

const loadData = document.getElementById("loadData"); // This targets the button and gives it an identity
const photographers_DD = document.getElementById("photographers_Dropdown");

const loadPhotographyData = async () => { // this method triggers when the button is clicked
    const data = await fetch("http://localhost:3500/all_photographers"); //get data from database (in this case the data.json is our database)
    let resp = await data.json(); //convert data to json so we can read the data   
    // console.log(resp);
    createTemplate(resp);
}

const createTemplate = (jsonData) => {
    let cnt = 0;
    while (cnt < jsonData.length) {
        let photograper_Name = jsonData[cnt].first_name + " " + jsonData[cnt].last_name;
        photographers_DD.appendChild(addNameToDropdown(jsonData[cnt]._id, photograper_Name));
        nameCard.appendChild(createNameCard(photograper_Name, jsonData[cnt].votes));
        loadData.appendChild(createButton(photograper_Name));
        loadData.appendChild(createAccordion(jsonData[cnt].pictures));
        cnt++;
    }
    // }
}

//=========== Add Name to Dropdown =================
const addNameToDropdown = (_id, name) => {
    const opt = document.createElement("OPTION");
    opt.setAttribute("value", _id);
    opt.textContent = name;
    return opt;
}

//************ Code to create button for Accordion */
const createButton = (name) => {
    const btn = document.createElement("BUTTON");
    btn.setAttribute("class", "accordion");
    btn.textContent = name;
    return btn;
}


//**** Creates Picture Container */
const createAccordion = (arr_pix) => { // this method creates the accordion   
    const divPanel = document.createElement("DIV"); //create a new div
    divPanel.setAttribute("class", "panel"); //assign a class panel to it;  
    divPanel.style.display = "none";
    divPanel.style.marginBottom = "30px";

    for (let i = 0; i < arr_pix.length; i++) {
        const img1 = document.createElement("IMG"); //create a new image tag
        img1.setAttribute("class", "display_Images");//assign class to it
        img1.setAttribute("src", `http://localhost:3500/${arr_pix[i].path.substring(7)}`);//assign src to it - the path of the image;
        divPanel.appendChild(img1); //attach the image to the div
    }

    return divPanel;
}

//================ Create name card showing votes ==========================

const createNameCard = (name, vote) => {
    const div = document.createElement("DIV");
    div.setAttribute("class", "votes");
    const span = document.createElement("SPAN");
    span.setAttribute("class", "pullLeft");
    span.textContent = name;
    div.appendChild(span);

    const span1 = document.createElement("SPAN");
    span1.setAttribute("class", "pullRight");
    span1.textContent = `Votes: `;
    const itag = document.createElement("I");
    itag.setAttribute("class", "far fa-thumbs-up");
    span1.appendChild(itag);

    const span2 = document.createElement("SPAN");
    // span1.setAttribute("class", "pullRight");
    span2.textContent = ` ${vote}`;
    span1.appendChild(span2);

    div.appendChild(span1);
    return div;

}

//============== Vote Photographer
const votePhotographer = async () => {
    let link = "http://localhost:3500/vote_photographer";
    data =
    {
        "id": photographers_Dropdown.value
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
    console.log(resp);
    if (resp === "success") {
        location.reload();
    }
    else {
        votingError.style.display = "block";
    }
}

vote_photographer.addEventListener('click', votePhotographer); // Do something when the button is clicked
window.addEventListener('load', loadPhotographyData); // Do something when the button is clicked

