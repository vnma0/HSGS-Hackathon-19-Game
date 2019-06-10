class ConstraintChecker {
    constructor() {
        this.rows = new Array();
        this.cols = new Array();
        this.squares = new Array();
    }

    initialize(grid) {
        for (let idx = 0; idx < 9; idx++) {
            this.rows[idx] = new Array();
            this.cols[idx] = new Array();
            this.squares[idx] = new Array();
        }

        let idx = 0;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.rows[row].push(grid.getCell(row, col));
                this.cols[col].push(grid.getCell(row, col));
                idx++;
            }
        }
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let indexSqr = Math.floor(row / 3) + Math.floor(col / 3) + 2 * Math.floor(col / 3);
                this.squares[indexSqr].push(grid.getCell(row, col));
            }
        }
    }

    isValid(array) {
        let valid = true;
        let elements = [];
        let cells = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].visible) {
                if (elements.indexOf(array[i].number) === -1) {
                    elements.push(array[i].number);
                    cells.push(array[i]);
                } else {
                    array[i].error = cells[elements.indexOf(array[i].number)].error = true;
                    valid = false;
                    break;
                }
            }
        }
        return valid;
    }

    check(grid) {
        let error = false;
        for (let i = 0; i < 9; i++) {
            if (!this.isValid(this.squares[i])) {
                error = true;
                let x = Math.floor(i / 3) * 3;
                let y = i % 3 * 3;
                for (let j = 0; j < this.squares[i].length; j++) {
                    this.squares[i][j].lightError = true;
                }
            }
            if (!this.isValid(this.rows[i])) {
                error = true;
                for (let j = 0; j < this.rows[i].length; j++) {
                    this.rows[i][j].lightError = true;
                }
            }
            if (!this.isValid(this.cols[i])) {
                error = true;
                for (let j = 0; j < this.cols[i].length; j++) {
                    this.cols[i][j].lightError = true;
                }
            }
        }
        let completed = !error;
        if (!error) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (!grid.getCell(row, col).number) {
                        completed = false;
                    }
                }
            }
        }
        return completed;
    }
}