// the function used to load the UI file from server to browser
const fs = require('fs');
const common_path = './frontend/';
const path = './frontend/index.html';
const cssPath = './frontend/style.css';
const jsPath = './frontend/script.js';

function _loadContent(filename, resp) {
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

function _extractSubString(str) {
    let slash_idx = 0;
    let dot_idx = 0;
    let full_string = "";

    // loop to find the last '/' element and return the index
    for(let i = 0; i < str.length; i++) {
        if(str[i] === '/') {
            slash_idx = i;
        }
    }

    // loop to find the first '.' element and return the index
    for(let i = 0; i < str.length; i++) {
        if(str[i] === '.') {
            dot_idx = i;
            continue;
        }
    }

    // extract the substring between slash_idx and dot_idx
    for(let i = slash_idx + 1; i < dot_idx; i++) {
        full_string += str[i];
    }

    return full_string;
}

function _isContain(src, des) {
    let des_idx = 0;
    let des_counter = 0;
    for(let i = 0; i < src.length;i++) {
        if(src[i] === des[des_idx]) {
            des_idx++;
            des_counter++;
        } else {
            while(des_counter > 0) {
                i--;
                des_counter--;
                des_idx--;
            }
        }
        if(des_idx === des.length) return 1;
    }
}

function _logAccessedToServer(request) 
{
    if(request.url.length === 1) {
        console.log("Accessed at main page");
    }
    if(_isContain(request.url, "html") === 1) {
        console.log("Accessed at " + _extractSubString(request.url) + " page");
    }
}
function _getRootPage(request, response)
{
    switch (request.url) {
        case '/style.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            _loadContent(cssPath, response);
            break;
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            _loadContent(path, response); // load the data from path source to the browser via response
            break;
        case '/script.js':
            response.writeHead(200, {'Content-Type': 'text/js'});
            _loadContent(jsPath, response);
            break;
        case '/login/signup.html': // routing to another html page
            response.writeHead(200, {'Content-Type': 'text/html'});
            _loadContent(common_path + '/login/signup.html', response); // the folder login is inside the frontend folder
            break;
        case '/login/signup.css':
            response.writeHead(200, {'Content-Type': 'text/css'});
            _loadContent(common_path + '/login/signup.css', response); // the folder login is inside the frontend folder
            break;
        case '/login/login.js':
            response.writeHead(200, {'Content-Type': 'text/js'});
            _loadContent(common_path + '/login/login.js', response); // the folder login is inside the frontend folder
            break;
        default:
            response.statusCode = 404; // set status to 404 for not finding rendering file
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'}); // send the error code
            _loadContent(common_path + 'error.html', response);
            break
    }
}

function getRootPage(request, response) {
    _getRootPage(request, response)
    // function to log accessed to server
    _logAccessedToServer(request);
}



module.exports = getRootPage;