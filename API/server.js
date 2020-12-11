//Import libraries to use
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create instance of Express library so we can code the API
const app = express();
//Make the instance use json format
app.use(express.json());
//make intance use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('uploads'))
const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './uploads/');
    },
    filename: (req, file, next) => {
        next(null, file.originalname);
    }
})

const fileFilter = (req, file, next) => {
    if (!file) { //ns
        next(new Error("No file selected"));//ns
    }//ns
    if (file.mimetype === "image/jpeg" || file.mimtype === "image/png") {
        next(null, true);
    } else {
        next({ message: "File type not supported" }, false);//ns
    }
}
const fileFilterVideo = (req, file, cb) => {
    if (file.mimetype === "video/mp4" || file.mimtype === "video/gif") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter,
});
const uploadVideo = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilterVideo
});



//======================== Connection String =============================
const mongoose = require('mongoose'); // import library
mongoose.connect('mongodb://localhost/voting_office', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//Confirm connection to mongodb was successful
db.once('open', () => {
    console.log("connected to mongoDB successfully");
})

//Check if there are errors in the database
db.on('error', (err) => {
    console.log(err);
})

// load the model for newuser
let new_User = require('./models/newUser');

// load the model for photography
let photography = require('./models/photography');

// load the model for video
let video = require('./models/video');

//1st end-point i.e. this is the address the front end will target for a specific operation
app.get('/', (req, res) => {
    res.json("This is home page of API");
})

//get all users - usernames
app.get('/all_users', (req, res) => {
    let allUsers = [];
    new_User.find({}, (err, users) => {
        if (err) {
            res.json("error");
        }
        else {
            for (let i = 0; i < users.length; i++) {
                let dictn = {};
                dictn["id"] = users[i]['_id'];
                dictn["username"] = users[i]['username'];
                allUsers.push(dictn);
            }
            res.json(allUsers);
        }
    });

})

//register new users
app.post('/register', (req, res) => {
    let newUser = new new_User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    newUser.save((err) => {
        if (err) {
            res.json("error registering user");
        } else {
            res.json("registration successful");
        }
    });

})

//login existing users
app.post('/login', (req, res) => {
    new_User.find({ username: req.body.username }, (err, user) => {
        if (err) {
            res.json("failed");
        }
        else {
            if (user.length == 0 || user[0]['password'] !== req.body.password) {
                res.json("failed");
            }
            else {
                res.json("success");
            }
        }
    });
})

//Register and upload Photographer content
// app.post('/uploadPhotography', upload.array('photos'), (req, res, next) => {
app.post('/uploadPhotography', upload.array('photos'), (req, res, next) => {

    // photographyUpload(req, res, (err) => {
    //     if (err instanceof multer.MulterError) {
    //         next(err);
    //     } else if (err) {
    //         next(err);
    //     }
    // })
    try {
        let phot = new photography();
        phot.first_name = req.body.first_Name
        phot.last_name = req.body.last_Name
        phot.votes = req.body.votes
        for (let i = 0; i < req.files.length; i++) {
            phot.pictures.push(req.files[i]);
        }
        phot.save((err) => {
            if (err) {
                next("error registering to database");
            } else {
                res.json("Uploaded images successfully");
            }
        });
    } catch (err) {
        next(err);
    }


})

//Register and upload Video content
app.post('/uploadVideo', uploadVideo.array('Videos'), (req, res) => {
    let vid = new video();
    vid.first_name = req.body.first_Name
    vid.last_name = req.body.last_Name
    vid.votes = req.body.votes
    for (let i = 0; i < req.files.length; i++) {
        vid.videos.push(req.files[i]);
    }
    vid.save((err) => {
        if (err) {
            res.json("error uploading videos");
        } else {
            res.json("Uploaded videos successfully");
        }
    });
})

//Get all photographers
app.get('/all_photographers', (req, res) => {

    let arr = [];
    photography.find({}, (err, photographers) => {
        if (err) {
            res.json("error");
        }
        else {
            // photographers.forEach((name) => {
            //     arr.push(`${name.first_name} ${name.last_name} - votes: ${name.votes}`);
            // })
            // res.json(arr);
            res.json(photographers);
        }
    });
})

//Get all Videos
app.get('/all_videos', (req, res) => {
    video.find({}, (err, videos) => {
        if (err) {
            res.json("error");
        }
        else {
            res.json(videos);
        }
    });

})


//========== Handle voting a photographer
app.post('/vote_photographer', (req, res) => {
    photography.updateOne({ _id: req.body.id },
        {
            $inc: {
                votes: 1
            }
        }, (err, voted) => {
            if (err) {
                res.json("error");
            } else {
                res.json("success")
            }
        })
})


//  ============= Error Handler ===============

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);

})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });

})
//============================================


//Declare a variable for our port to transmit on
//Process.env is used by cloud service if API is in the cloud and 3500 will be used by our computer to transmit
// '||' means 'OR' in JS
const port = process.env.PORT || 3500;

//Make instance of app listen for calls/requests
app.listen(port, () => console.log(`Server running on port: ${port}`));

