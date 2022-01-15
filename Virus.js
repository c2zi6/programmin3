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