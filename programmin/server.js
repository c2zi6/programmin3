let express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("runed on port:3000");
});

matrix = [];

function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, lesCount, lCount){
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let o = 0; o < matrixSize; o++) { 
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 2;
    }
    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 3;
    }
    for (let i = 0; i < lesCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 5;
    }
    for (let i = 0; i < lCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 4;
    }
}

grassAr = [];
grassEaterArr = [];
predatorArr = [];
lesArr = [];
virusArr = [];

let Grass = require("./Grass");
let GrassEater = require("./GrassEater");
let Les = require("./Les");
let Predator = require("./Predator");
let Virus = require("./Virus");

function createObject() {
    matrixGenerator(40, 30, 15, 10, 20, 50);
//    matrixGenerator(40, 0, 0, 10, 10, 120);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                gr = new Grass(x, y);
                grassAr.push(gr);
            } else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                fr = new GrassEater(x, y);
                grassEaterArr.push(fr);
            } else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                pr = new Predator(x, y, 40);
                predatorArr.push(pr);
            } else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                lr = new Les(x, y);
                lesArr.push(lr);
            }else if (matrix[y][x] == 5) {
                matrix[y][x] = 6
                lr = new Virus(x, y);
                virusArr.push(lr);
            }
        }
    }
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
    io.sockets.emit('send matrix', matrix);
}

setInterval(game, 250);

function restart() {
    grassAr = [];
    predatorArr = [];
    grassEaterArr = [];
    lesArr = [];
    virusArr = [];
    createObject();
    io.sockets.emit("send matrix", matrix);
}
function killles() {
    lesArr = [];
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == 5) {
                matrix[i][j] = 0;
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGrassEaters() {
    var x = Math.round(Math.random() * matrix.length);
    var y = Math.round(Math.random() * matrix.length);
    if (matrix[y][x] != 0) {
        spawnGrassEaters();
    } else {
        matrix[y][x] = 2;
        grassEaterArr.push(new GrassEater(x, y));
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    createObject();
    socket.on("restart", restart);
    socket.on("killles", killles);
    socket.on("spawnGrassEaters", spawnGrassEaters);
});



