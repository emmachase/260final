const express = require("express");
const session = require("express-session");
const path = require("path");
const { unlink } = require("fs");
const crypto = require("crypto");
const mime = require("mime");

const argon = require("argon2");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const MemoryStore = require('memorystore')(session)
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: true,
    secret: "\x68\x61\x68\x61\x68\x61\x68\x20\x66\x75\x6e\x6e\x79"
        +   "\x20\x61\x6c\x73\x6f\x20\x61\x6c\x79\x73\x73\x61\x20"
        +   "\x69\x73\x20\x63\x75\x74\x65\x20\x61\x6e\x64\x20\x69"
        +   "\x6d\x20\x67\x61\x79\x20\x66\x6f\x72\x20\x68\x65\x72"
}))

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/final', {
    useNewUrlParser: true,
    useFindAndModify: false,
});



const multer = require('multer')
const storage = multer.diskStorage({
    destination(_a, _b, cb) { cb(null, "./images") },
    filename(_req, file, cb) {
        crypto.pseudoRandomBytes(16, function (_err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

const upload = multer({ 
    storage, 
    limits: {
        fileSize: 10000000
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

const User = mongoose.model('User', userSchema);

const uploadSchema = new mongoose.Schema({
    title: String,
    path: String,
    desc: String,
    tags: [String],
    mime: String,
    created: {
        type: Date,
        default: Date.now
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Upload = mongoose.model('Upload', uploadSchema);

const commentSchema = new mongoose.Schema({
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    upload: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
    },
    text: String
})

const Comment = mongoose.model('Comment', commentSchema);

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
    if (!req.session.user)
      return res.status(403).send({
        message: "not logged in"
      });
    try {
      const user = await User.findOne({
        _id: req.session.user
      });
      if (!user) {
        return res.status(403).send({
          message: "not logged in"
        });
      }
      // set the user field in the request
      req.user = user;
    } catch (error) {
      // Return an error if user does not exist.
      return res.status(403).send({
        message: "not logged in"
      });
    }
  
    // if everything succeeds, move to the next middleware
    next();
};

app.get('/api/images/:path', validUser, async (req, res) => {
    res.sendFile(path.join(__dirname, 'images', req.params.path));
})

app.post('/api/login', async (req, res) => {
    if (!req.body.password || !req.body.name) return res.sendStatus(400);

    let user = await User.findOne({ name: req.body.name });
    if (user) {
        const valid = await argon.verify(user.password, req.body.password);
        if (!valid) return res.sendStatus(401);
    } else {
        const hash = await argon.hash(req.body.password);
        user = new User({ name: req.body.name, password: hash });
        await user.save();
    }

    console.log(user, user._id, user.__id)
    req.session.user = user._id;
    return res.sendStatus(200);
});

app.post('/api/upload', validUser, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }

    if (!req.session.user) {
        unlink(req.file.path)

        return res.sendStatus(401);
    }

    const filepath = "/api/images/" + req.file.filename;
    const upload = new Upload({
        title: req.body.title,
        path: filepath,
        desc: req.body.desc,
        tags: req.body.tags.split(/\s*,\s*/).map(x => x.trim()),
        mime: req.file.mimetype,
        uploader: req.session.user
    });

    try {
        await upload.save();
        res.send(upload);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the uploads in the museum.
app.get('/api/uploads', validUser, async (req, res) => {
    try {
        const uploads = await Upload.find().populate("uploader", "name");
        res.send(uploads);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get comments for upload
app.get('/api/uploads/:id/comments', validUser, async (req, res) => {
    try {
        const comments = await Comment.find({ upload: req.params.id }).populate("poster", "name");
        res.status(200).send(comments);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get comments for upload
app.post('/api/uploads/:id/comments', validUser, async (req, res) => {
    try {
        const comment = new Comment({
            poster: req.session.user,
            upload: req.params.id,
            text: req.body.text
        });

        await comment.save();

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a specific upload from the database
app.get('/api/uploads/:id', validUser, async (req, res) => {
    try {
        const upload = await Upload.findById(req.params.id).populate("uploader", "name");
        res.status(200).send(upload);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete an upload from the database
app.delete('/api/uploads/:id', validUser, async (req, res) => {
    try {
        await Upload.findByIdAndDelete(req.params.id)

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Edit an upload in the database
app.put('/api/uploads/:id', validUser, async (req, res) => {
    try {
        if (req.body.tags) {
            req.body.tags = req.body.tags.split(/\s*,\s*/);
        }
        
        await Upload.findOneAndUpdate({
            _id: req.params.id
        }, req.body)

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));