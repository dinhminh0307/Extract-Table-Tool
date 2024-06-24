const express = require('express');
const common_path = './frontend/';
const err_path = 'error/404.html'
const path = './frontend/index.html';
const cssPath = './frontend/style.css';
const jsPath = './frontend/script.js';

const app = express();

app.use(express.static("frontend")); // the html file is static so that it just call once and other css and js will be called
app.use(express.static(common_path + 'login')); // the html file is static so that it just call once and other css and js will be called

// listen for request
app.listen(3000);

/**THe static will render all the file that link on the root path */
app.get('/', (req,res)=> {
    res.sendFile(path, {root : __dirname}); // send the file with its relative path to browser. root is the path that express knows on pc
    console.log("Accessed at main page");
});


app.get('/signup.html', (req,res)=> {
    res.sendFile(common_path + 'login/signup.html', {root : __dirname}); // send the file with its relative path to browser. root is the path that express knows on pc
    console.log("Accessed at main page");
});

// if user type in the url, it will redirect
app.get('/signup', (req,res) => {
    res.redirect('/signup.html');
    // _logAccessedToServer(req);
})

app.use((req,res) => {
    res.sendFile(common_path + err_path, {root : __dirname});
})