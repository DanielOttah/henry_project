// ==================== Photography Section =============================
const ph_FName = document.getElementById("ph_FName");
const ph_LName = document.getElementById("ph_LName");
const ph_Submit = document.getElementById("ph_Submit");
const photographyEvent = document.getElementById("photographyEvent");
const uploadPhotography = document.getElementById("uploadPhotography");
const photos = document.getElementById("uploadPhotography").querySelector('input[type="file"][multiple]');

//=========== Open Accordion ====================
const openPhotographyUpload = () => {
    if (uploadPhotography.style.display === "none") {
        uploadPhotography.style.display = "block";
    }
    else {
        uploadPhotography.style.display = "none";
    }
}
photographyEvent.addEventListener('click', openPhotographyUpload);
//=====================================================

//==================== Upload Info to database through API ==================
ph_Submit.addEventListener('click', async () => {
    let link = "http://localhost:3500/uploadPhotography";
    const photographyData = new FormData();
    photographyData.append('first_Name', ph_FName.value);
    photographyData.append('last_Name', ph_LName.value);
    photographyData.append('votes', 0);
    for (let i = 0; i < photos.files.length; i++) {
        photographyData.append('photos', photos.files[i]);
    }
    let resp = await fetch(link, {
        method: "POST",
        body: photographyData
    })
    let response = await resp.json();
    console.log(response);
});


//============================ Music Section ======================================
const musicEvent = document.getElementById("musicEvent");
const uploadMusic = document.getElementById("uploadMusic");

const openMusicUpload = () => {
    if (uploadMusic.style.display === "none") {
        uploadMusic.style.display = "block";
    }
    else {
        uploadMusic.style.display = "none";
    }
}

musicEvent.addEventListener('click', () => {

});







//============================ Art Section ======================================
const artEvent = document.getElementById("artEvent");
const uploadArt = document.getElementById("uploadArt");

const openArtUpload = () => {
    if (uploadArt.style.display === "none") {
        uploadArt.style.display = "block";
    }
    else {
        uploadArt.style.display = "none";
    }
}

artEvent.addEventListener('click', openArtUpload);
