var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

var matrix = [];
function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, lesCount, lCount){
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let o = 0; o < matrixSize; o++) { 
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 2;
    }
    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 3;
    }
    for (let i = 0; i < lesCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 5;
    }
    for (let i = 0; i < lCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 4;
    }
}
matrixGenerator(40, 20, 15, 3, 15, 15);

io.sockets.emit('send matrix', matrix);

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