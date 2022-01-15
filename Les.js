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