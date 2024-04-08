const http = require('http');
const fs = require('fs');

const path = './frontend/index.html';
const cssPath = './frontend/sty.css';
const jsPath = './frontend/scripts.js';

// the function used to load the UI file from server to browser
function loadContent(filename, resp) {
    fs.readFile(path, (err, data) => {
        if (err) {
            resp.write('<p>404 Error</p>'); // return 404 error to user side
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
    res.writeHead(200, { 'Content-Type': 'text/html'}); // response as text
    // send html response page with whole file content with fs module
    if(req.url === '/') {
        loadContent(path, res);
    } else if(req.url === '/style.css') {
        loadContent(cssPath, res);
    } else if(req.url === '/script.js') {
        loadContent(jsPath, res);
    }
    // fs.readFile(path, (err, data) => {
    //     if (err) {
    //         res.write('<p>404 Error</p>'); // return 404 error to user side
    //         res.end();
    //     } else {
    //         res.write(data); // return the html page to user side
    //         res.end();
    //     }
    // })
})

const port = 3000; // port to communicate from browser to server

server.listen(port, 'localhost', () => {
    console.log('Waiting for request') // server is waiting a request
}) 