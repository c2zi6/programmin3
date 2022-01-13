class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiplay++;
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.multiplay > 3) {
            let x = exact[0];
            let y = exact[1];
            let grass = new Grass(x, y)
            matrix[y][x] = 1;
            grassAr.push(grass);
            this.multiplay = 0;
        }
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);
            this.energy = 20;
        }
    }
    eat() {
        if (Math.random() * 500 < 1) {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 6;
            virusArr.push(new Virus(this.x, this.y))
        } else {
            let found = this.chooseCell(1);
            let exact = random(found);
            if (exact) {
                this.energy += 3;
                let x = exact[0];
                let y = exact[1];
                for (var i in grassAr) {
                    if (x == grassAr[i].x && y == grassAr[i].y) {
                        grassAr.splice(i, 1);
                    }
                }
                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;

                if (this.energy > 30) {
                    this.mul();
                }
            } else {
                this.move();
            }
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 4;
    }
}
//-----------------------------------------------------------------------------------
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat() {
        if (Math.random() * 500 < 1) {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 6;
            virusArr.push(new Virus(this.x, this.y))
        } else {
            this.getNewCoordinates();
            let found = this.chooseCell(1);
            let found2 = this.chooseCell(2);
            for (var i in found2) {
                found.push(found2[i])
            }
            let exact = random(found);
            if (exact) {
                let x = exact[0];
                let y = exact[1];
                for (var i in grassAr) {
                    if (x == grassAr[i].x && y == grassAr[i].y) {
                        grassAr.splice(i, 1);
                        this.energy += 2
                    }
                }
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        this.energy += 10
                    }
                }

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;
                this.y = y;
                this.x = x;
                if (this.energy > 25) {
                    this.mul();
                }
            } else {
                this.move();
            }
        }
    }
    mul() {
        var found = this.chooseCell(0);
        var rand = random(found);
        if (rand) {
            var y = rand[1];
            var x = rand[0];
            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y));
            this.energy = 10;
        }
    }
    move() {
        this.energy--;
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 4;
    }
}
//--------------------------------------------------------------------------------------------
class Les {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 40;
        this.d = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat() {
        if (Math.random() * 500 < 1) {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            matrix[this.y][this.x] = 6;
            virusArr.push(new Virus(this.x, this.y))
        } else {
            this.getNewCoordinates();
            let found = this.chooseCell(4);
            let exact = random(found);
            if (exact) {
                let x = exact[0];
                let y = exact[1];
                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;
                this.y = y;
                this.x = x;
                this.energy += 5
                this.mul();
            } else {
                this.move();
            }
        }
    }
    mul() {
        let found = [this.chooseCell(0), this.chooseCell(1)];
        let exact = random(random(found));
        if (exact) {
            var y = exact[1];
            var x = exact[0];
            for (var i in grassAr) {
                if (this.x == grassAr[i].x && this.y == grassAr[i].y) {
                    grassAr.splice(i, 1);
                }
            }
            matrix[y][x] = 3;
            lesArr.push(new Les(x, y));
            this.energy = 10;
        }
    }
    move() {
        let found = [this.chooseCell(0), this.chooseCell(1)];
        let exact = random(random(found));
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            if (matrix[y][x] == 0) {
                this.d = 0;
            } else if (matrix[y][x] == 1) {
                this.d = 1;
            }
            matrix[y][x] = 5;
            matrix[this.y][this.x] = this.d;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        } else {
            this.energy--;
        }
    }
    die() {
        for (var i in lesArr) {
            if (this.x == lesArr[i].x && this.y == lesArr[i].y) {
                lesArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 4;
    }
}
//---------------------------------------------------------------------------------------------------------
class Virus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.d = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates();
        var found = this.chooseCell(0);
        var exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    infect() {
        this.energy--;
        if (this.energy < 0) {
            this.die();
        } else {
            this.getNewCoordinates();
            var found = [this.chooseCell(2), this.chooseCell(3), this.chooseCell(5)];
            var exact = random(random(found));
            if (exact && Math.random() < 0.3) {
                let x = exact[0];
                let y = exact[1];
                matrix[y][x] = 6;
                virusArr.push(new Virus(x, y));
                for (var i in lesArr) {
                    if (x == lesArr[i].x && y == lesArr[i].y) {
                        lesArr.splice(i, 1);
                    }
                }
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                    }
                }
                for (var i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                    }
                }
            } else {
                this.move();
            }
        }
    }
    die() {
        for (var i in virusArr) {
            if (this.x == virusArr[i].x && this.y == virusArr[i].y) {
                virusArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 0;
    }
}