// const greet = (name) => { // name is parameter
//     console.log(`hello ${name}`)
// }

// greet('Minh')

// global.setTimeout(() => { // do sth after time similar to delay
//     console.log(`dcmm`)
//     global.clearInterval(myFunc) //after this amount of time, it will clear setinterval function
// }, 3000)

// const myFunc = global.setInterval(() => { // do every after amount of time
//     console.log(`Hello`)
// }, 1000);

/* Working with directory */
// console.log(__dirname) // path of current foler
// console.log(__filename) // path of current folder with file name

/* import another file*/
// import the file from people, use require method
const abc = require('./people') // so now abc will store data from people file

// abc will work as the class type in the people file
// console.log(abc.ageNew())
// abc.bark()
const fs = require('fs')
//write data via write stream
// read data via read stream

const read = fs.createReadStream('./data/doc.dat') // inside is the file data location
read.on('data', (chunk) => { // callbak function event listener, everytime I receive the data i can access the the chunk of data
    console.log('-------New Chunk -----------')
    console.log(chunk)
})

const writeS = fs.createWriteStream('./data/write.dat')

const content = 'and in your node server, assuming you’re running Express, you need to install and configure a package called request. Request is mainly used for sending HTTP requests in node js. I personally use a modification of requests called request-promise. This package has incorporated bluebird promises into the request module, so it’s easier to execute async-await functionality when involving HTTP requests.';


// writeS.write(content, (dat) => {
//     // this will execute the writeS first then clear it
//     if(fs.statSync('./data/write.dat').size == 0) {
//         console.log('Write successfully');
//     }
//     else {
//         fs.truncate('./data/write.dat', 0, () => {
//             console.log('successfully');
//         })
//     }
// }) 
read.pipe(writeS);

