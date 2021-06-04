const path = require('path');
const {config,engine} = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const session = require('express-session');
const MongoStore = require('connect-mongo');


const connectFlash = require("connect-flash");
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const deletePostController = require('./controllers/deletePost')
const filterPostController = require('./controllers/filterPost')
const markPostController = require('./controllers/markPost')
const getPostController = require('./controllers/getPost')
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logout");
const storePost = require('./middleware/storePost');
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


const app = new express();

app.set('views', __dirname + '/views');

const PORT = process.env.PORT || 3000;


 mongoose.connect('mongodb://Harshini:Harshini28@cluster0-shard-00-00.tflak.mongodb.net:27017,cluster0-shard-00-01.tflak.mongodb.net:27017,cluster0-shard-00-02.tflak.mongodb.net:27017/Blog?ssl=true&replicaSet=atlas-p4sej9-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    console.log('Connected to MongoDB');
    app.use(session({
        secret: 'secret',
        store: MongoStore.create({ clientPromise })
    })
    );

});

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'secret',
    resave: false, 
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 1000
      },
      rolling: true
}));

app.use(fileUpload());
app.use(express.static("public"));
app.use(engine);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(connectFlash());

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});



app.get("/", homePageController);
app.post("/filter",filterPostController);
app.get("/post/:id", getPostController);
app.get("/posts/new/", auth,createPostController);
app.post("/posts/store/:userId", auth, storePost,storePostController);
app.get("/post/delete/:id", auth,deletePostController);
app.get("/post/mark/:id", auth,markPostController);
app.get('/auth/login',loginController);
app.post("/users/login", loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", redirectIfAuthenticated, logoutController);

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.listen(PORT, () => {
  console.log("App listening on port 4000");
});