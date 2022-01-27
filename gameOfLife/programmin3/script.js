var socket = io();

var side = 25;

function setup() {
//    matrixGenerator(40, 20, 40, 0, 0, 0)
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    gr = new Grass(1, 6);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                gr = new Grass(x, y);
                grassAr.push(gr);
            } else if (matrix[y][x] == 2) {
                fr = new GrassEater(x, y);
                grassEaterArr.push(fr);
            } else if (matrix[y][x] == 3) {
                pr = new Predator(x, y);
                predatorArr.push(pr);
            } else if (matrix[y][x] == 5) {
                lr = new Les(x, y);
                lesArr.push(lr);
            }
        }
    }
    console.log(lesArr)
}

function draw() {
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('darkgreen');
            } else if (matrix[y][x] == 0) {
                fill('#dddddd');
            } else if (matrix[y][x] == 2) {
                fill('yellow');
            } else if (matrix[y][x] == 3) {
                fill('red');
            } else if (matrix[y][x] == 4) {
                fill('brown');
            } else if (matrix[y][x] == 5) {
                fill('orange');
            } else if (matrix[y][x] == 6) {
                fill('#ff00ff');
            }
            rect(side * x, side * y, side, side);
        }
    }
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
}

setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)