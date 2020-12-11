

/*================ Search Events*/
const searchButton = document.getElementById("searchEvents");
const searchQuery = document.getElementById("searchQuery");

const loadEvents = (e) => {
    e.preventDefault();

    //Check if there's events
    if (searchQuery.value == "") {
        alert("Please enter a query to search for");
    }
    else {
        console.log("Seeing here");
        let searchInput = searchQuery.value.toLowerCase();
        if (searchInput.toLowerCase().includes("art")) {
            location.replace("./art.html");
        }
        else if (searchInput.toLowerCase().includes("pho")) {
            location.replace("./photography.html");
        }
        else {
            location.replace("./no_events.html");
        }
    }

}

if (searchButton) {
    searchButton.addEventListener("click", (e) => loadEvents(e))
}

