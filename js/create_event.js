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







//============================ Video Section ======================================
const videoEvent = document.getElementById("videoEvent");
const uploadVideo = document.getElementById("uploadVideo");
const vid_FName = document.getElementById("vid_FName");
const vid_LName = document.getElementById("vid_LName");
const vid_Submit = document.getElementById("vid_Submit");
const vids = document.getElementById("uploadVideo").querySelector('input[type="file"][multiple]');

const OpenVideoUpload = () => {
    if (uploadVideo.style.display === "none") {
        uploadVideo.style.display = "block";
    }
    else {
        uploadVideo.style.display = "none";
    }
}

videoEvent.addEventListener('click', OpenVideoUpload);

//==================== Upload Video info to database through API ==================
vid_Submit.addEventListener('click', async () => {
    // console.log(vids.files[0]);
    let link = "http://localhost:3500/uploadVideo";
    const videoData = new FormData();
    videoData.append('first_Name', vid_FName.value);
    videoData.append('last_Name', vid_LName.value);
    videoData.append('votes', 0);
    for (let i = 0; i < vids.files.length; i++) {
        videoData.append('Videos', vids.files[i]);
    }
    let resp = await fetch(link, {
        method: "POST",
        body: videoData
    })
    let response = await resp.json();
    console.log(response);
});