const http = require('http');
const fs = require('fs');
const filepath = require('path');
const _ = require('lodash');

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

function getRootPage(request, response) {
    switch (request.url) {
        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            loadContent(cssPath, response);
            break;
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            loadContent(path, response);
            break;
        case '/script.js':
            response.writeHead(200, {'Content-Type': 'text/js'});
            loadContent(jsPath, response);
            break;
        case '/login/signup.html': // routing to another html page
            response.writeHead(200, {'Content-Type': 'text/html'});
            loadContent(common_path + '/login/signup.html', response); // the folder login is inside the frontend folder
            break;
        default:
            response.statusCode = 404; // set status to 404 for not finding rendering file
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'}); // send the error code
            loadContent(common_path + 'error.html', response);
            break
    }
}

const server = http.createServer((req,res) => {
    /*content type:
    plain/text: file to download
    text/html: html structure */
    // this function is executed when a request is made

    /* this will render all type of css and html */
    getRootPage(req, res);
})

const port = 3000; // port to communicate from browser to server

server.listen(port, 'localhost', () => {
    console.log('Waiting for request') // server is waiting a request
}) 