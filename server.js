const http = require('http');
const fs = require('fs');
const filepath = require('path');

const common_path = './frontend/';
const path = './frontend/index.html';
const cssPath = './frontend/style.css';
const jsPath = './frontend/script.js';

// the function used to load the UI file from server to browser
function loadContent(filename, resp) {
    fs.readFile(filename, (err, data) => {
        if (err) {
            resp.write('<p>404 Error VCL</p>'); // return 404 error to user side
            resp.end();
        } else {
            resp.write(data); // return the html page to user side
            resp.end();
        }
    })
}

const server = http.createServer((req,res) => {
    /*content type:
    plain/text: file to download
    text/html: html structure */
    // this function is executed when a request is made

    /* ignore the favicon */
    if(req.url === '/favicon.ico') {
        res.writeHead(204); // No Content
        res.end();
        return;
    }
    console.log('request made');
    console.log(req.url);
    /* this will render all type of css and html */
    switch (req.url) {
        case '/style.css':
            res.writeHead(200, {'Content-Type': 'text/css'});
            loadContent(cssPath, res);
            break;
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            loadContent(path, res);
            break;
        case '/script.js':
            res.writeHead(200, {'Content-Type': 'text/js'});
            loadContent(jsPath, res);
            break;
        case '/login/signup.html': // routing to another html page
            res.writeHead(200, {'Content-Type': 'text/html'});
            loadContent(common_path + '/login/signup.html', res); // the folder login is inside the frontend folder
            break;
        default:
            res.end();
            break
    }
})

const port = 3000; // port to communicate from browser to server

server.listen(port, 'localhost', () => {
    console.log('Waiting for request') // server is waiting a request
}) 