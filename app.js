const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const body_parser = require('body-parser');

const commonPath = './frontend/';
const errorPath = 'error/404.html';
const indexPath = path.join(commonPath, 'index.html');

app.use(express.static("frontend"));
app.use(express.static(path.join(commonPath, 'login')));
app.use(body_parser.urlencoded({extended: false})); // allow us to parse url encoded form, the extended is to deal with complicated url

// Main route for the root URL
app.get('/', (req, res) => {
    res.sendFile(indexPath, { root: __dirname });
    console.log("Accessed at main page");
    console.log(req.url);
});

// Route to serve the signup page
app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(commonPath, 'login/signup.html'), { root: __dirname });
    console.log("Accessed signup page");
});

// Redirect /signup to /signup.html
app.get('/signup', (req, res) => {
    res.redirect('/signup.html');
});

// handle post request, we need a module to parse the data form: body parser
// The action in the html must specify correct route and the method must be whether post or get
app.post('/post-success', (req, res) => {
    console.log(req.body);
    res.send('Success');
});

// Simple route to send a hello message
app.get('/hello', (req, res) => {
    res.send("Hello");
    console.log('dcmm'); // Custom log message
});

// Dynamic route with validation
app.get('/:name/:job', (req, res, next) => {
    const { name, job } = req.params;
    if (!name.match(/^[a-zA-Z]+$/) || !job.match(/^[a-zA-Z]+$/)) {
        return next(); // Pass control to the next middleware (404 handler)
    }
    res.send(`Hello ${name} from ${job}`);
    console.log(req.query); // Log query parameters if any
});

// 404 error handler for all other paths
app.use((req, res) => {
    res.status(404).sendFile(path.join(commonPath, errorPath), { root: __dirname });
});

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
