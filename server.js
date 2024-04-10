
const getRootPage = require('./backend/constant/constantFunction.js')
const http = require('http');
const filepath = require('path');
const _ = require('lodash');

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