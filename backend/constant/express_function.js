const common_path = './frontend/';
const path = './frontend/index.html';
const cssPath = './frontend/style.css';
const jsPath = './frontend/script.js';

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

function returnPage(app) {
    let req1;
    app.get('/', (req,res)=> {
        res.sendFile(path, {root : __dirname}); // send the file with its relative path to browser. root is the path that express knows on pc
        _logAccessedToServer(req);
    });
    
    
    app.get('/signup.html', (req,res)=> {
        res.sendFile(common_path + 'login/signup.html', {root : __dirname}); // send the file with its relative path to browser. root is the path that express knows on pc
        _logAccessedToServer(req);
    });

   

}

module.exports = returnPage;