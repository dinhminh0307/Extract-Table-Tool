// the function used to load the UI file from server to browser
const fs = require('fs');
const common_path = './frontend/';
const path = './frontend/index.html';
const cssPath = './frontend/style.css';
const jsPath = './frontend/script.js';

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
        case '/login/signup.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            loadContent(common_path + '/login/signup.css', response); // the folder login is inside the frontend folder
            break;
        case '/login/login.js':
            response.writeHead(200, {'Content-Type': 'text/js'});
            loadContent(common_path + '/login/login.js', response); // the folder login is inside the frontend folder
            break;
        default:
            response.statusCode = 404; // set status to 404 for not finding rendering file
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'}); // send the error code
            loadContent(common_path + 'error.html', response);
            break
    }
}


module.exports = getRootPage;