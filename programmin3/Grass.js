class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y, 0);
    }
    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.energy > 3) {
            let x = exact[0];
            let y = exact[1];
            let grass = new Grass(x, y)
            matrix[y][x] = 1;
            grassAr.push(grass);
            this.energy = 0;
        }
    }
}