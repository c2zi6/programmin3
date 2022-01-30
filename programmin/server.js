let express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
const { isBoolean } = require('util');
const LivingCreature = require('./LivingCreature');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("runed on port:3000");
});


let n = 50;
var matrix = [];
// function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, lesCount, lCount){
//     for (let i = 0; i < matrixSize; i++) {
//         matrix[i] = []
//         for (let o = 0; o < matrixSize; o++) { 
//             matrix[i][o] = 0;
//         }
//     }
//     for (let i = 0; i < grassCount; i++) {
//         let x = Math.floor(Math.random() * matrixSize);
//         let y = Math.floor(Math.random() * matrixSize);
//         matrix[y][x] = 1;
//     }
//     for (let i = 0; i < grassEaterCount; i++) {
//         let x = Math.floor(Math.random() * matrixSize);
//         let y = Math.floor(Math.random() * matrixSize);
//         matrix[y][x] = 2;
//     }
//     for (let i = 0; i < predatorCount; i++) {
//         let x = Math.floor(Math.random() * matrixSize);
//         let y = Math.floor(Math.random() * matrixSize);
//         matrix[y][x] = 3;
//     }
//     for (let i = 0; i < lesCount; i++) {
//         let x = Math.floor(Math.random() * matrixSize);
//         let y = Math.floor(Math.random() * matrixSize);
//         matrix[y][x] = 5;
//     }
//     for (let i = 0; i < lCount; i++) {
//         let x = Math.floor(Math.random() * matrixSize);
//         let y = Math.floor(Math.random() * matrixSize);
//         matrix[y][x] = 4;
//     }
// }
// matrixGenerator(40, 20, 15, 3, 15, 15);
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))

    }
}

io.sockets.emit("send matrix", matrix);
// console.log(matrix.length, '// 52 SERVER');
// io.sockets.emit('send matrix', matrix);

var grassAr = [];
var grassEaterArr = [];
var predatorArr = [];
var lesArr = [];
var virusArr = [];


Grass = require("./Grass");
GrassEater = require("./GrassEater");
Les = require("./Les");
Predator = require("./Predator");
Virus = require("./Virus");

function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] == 1
                gr = new Grass(x, y);
                grassAr.push(gr);
            } else if (matrix[y][x] == 2) {
                matrix[y][x] == 2
                fr = new GrassEater(x, y);
                grassEaterArr.push(fr);
            } else if (matrix[y][x] == 3) {
                matrix[y][x] == 3
                pr = new Predator(x, y);
                predatorArr.push(pr);
            } else if (matrix[y][x] == 5) {
                matrix[y][x] == 5
                lr = new Les(x, y);
                lesArr.push(lr);
            }
        }
    }
    console.log(matrix.length, '// 85 SERVER');
    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (var i in grassAr) {
        grassAr[i].mul();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in lesArr) {
        lesArr[i].eat();
    }
    for (var i in virusArr) {
        virusArr[i].infect();
    }
    // console.log(matrix.length, '// 106 SERVER');
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000);

io.on('connection', function () {
    createObject();
    
});