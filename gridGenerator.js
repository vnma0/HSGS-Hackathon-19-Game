class GridGenerator {
    generateNewGrid(numberOfHoles) {
        let grid = this.generateNewFullGrid();
        this.createHoles(grid, numberOfHoles);
        return grid;
    }

    generateNewFullGrid() {
        let success = true;
        let grid = new Grid();
        let constraintChecker = new ConstraintChecker();
        do {
            grid = new Grid();
            constraintChecker.initialize(grid);
            let numberOfVisible = 0;
            let numberOfIteration = 0;
            let success = true;
            do {
                numberOfVisible = 0;
                numberOfIteration++;
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        if (!grid.getCell(row, col).visible) {
                            grid.computeCellPossiblities(constraintChecker, grid.getCell(row, col));
                        } else {
                            numberOfVisible++;
                        }
                    }
                }
                let selectedCases = [];
                let minPossibilities = 10;
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        let cell = grid.getCell(row, col);
                        if (!cell.visible) {
                            if (cell.possibilities.length < minPossibilities) {
                                selectedCases = [];
                                minPossibilities = cell.possibilities.length;
                                selectedCases.push(cell);
                            } else if (cell.possibilities.length = minPossibilities) {
                                selectedCases.push(cell);
                            }
                        }
                    }
                }
                let cell = selectedCases[0];
                cell.setNumber(cell.possibilities[Math.floor(random(cell.possibilities.length))])
                let blank = false;
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        let cell = grid.getCell(row, col);
                        if (!cell.visible) {
                            grid.computeCellPossiblities(constraintChecker, cell);
                            if (!cell.possibilities.length) {
                                blank = true;
                            } else {
                                cell.setNumber(cell.possibilities[Math.floor(random(cell.possibilities.length))])
                            }
                        }
                    }
                }
                if (blank) {
                    success = false;
                    console.log("Can't solve grid, generating a new one...")
                    break;
                }
                if (numberOfIteration > 10000) {
                    success = false;
                    console.log("Can't solve grid, generating a new one...")
                    break;
                }
            } while (numberOfVisible < 81);
        } while (!success);
        for (let row = 0; row < 9; row++) {
            let s = '';
            for (let col = 0; col < 9; col++) {
                s += grid.getCell(row, col).number + '';
            }
            print(s);
        }
        return grid;
    }

    createHoles(grid, numberOfHoles) {
        for (let n = 0; n < numberOfHoles; n++) {
            let row = 0, col = 0;
            do {
                row = Math.floor(random(8));
                col = Math.floor(random(8));
            } while (!grid.getCell(row, col).number);
            grid.getCell(row, col).setNumber(0);
        }
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                grid.getCell(row, col).isFixed = grid.getCell(row, col).number > 0;
            }
        }
    }
} 