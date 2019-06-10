class Sudoku {
    constructor(size) {
        this.size = size;
        this.grid = new Grid();
        this.constraintChecker = new ConstraintChecker();
        this.selectedCell = null;
        this.showPossiblities = false;
    }

    initGrid(grid) {
        this.constraintChecker.initialize(grid);
        this.setSelectedCell(this.grid.getCell(4, 4));
    }

    generateGrid(difficulty) {
        let gridGenerator = new GridGenerator();
        this.grid = gridGenerator.generateNewGrid(difficulty);
        this.initGrid(this.grid);
    }

    checkGrid() {
        return this.constraintChecker.check(this.grid);
    }

    drawGrid() {
        this.grid.draw(this.size, this.selectedCell, this.showPossiblities);
    }

    getCellAt(x, y) {
        let row = Math.floor(y / this.size);
        let col = Math.floor(x / this.size);
        if (row < 0 || row > 8 || col < 0 || col > 8) {
            return undefined;
        } else {
            return this.grid.getCell(row, col);
        }

    }

    moveSelection(direction) {
        if (this.selectedCell) {
            let row = this.selectedCell.row;
            let col = this.selectedCell.col;
            switch (direction) {
                case 0:
                    this.setSelectedCell(this.grid.getCell(Math.max(0, row - 1), col));
                    break;
                case 1:
                    this.setSelectedCell(this.grid.getCell(row, Math.min(9, col + 1)));
                    break;
                case 2:
                    this.setSelectedCell(this.grid.getCell(Math.min(9, row + 1), col));
                    break;
                case 3:
                    this.setSelectedCell(this.grid.getCell(row, Math.max(0, col - 1)));
                    break;
            }
        }
    }

    setSelectedCell(cell) {
        this.selectedCell = cell;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.grid.getCell(row, col).highlight = cell.visible ? (this.grid.getCell(row, col).number === cell.number) : false;
            }
        }
    }

    setCellValue(cell, value) {
        if (!cell.isFixed && value >= 0 && value <= 10) {
            cell.setNumber(value);
            this.setSelectedCell(cell);
            this.grid.computePossibilities(this.constraintChecker);
        }
    }

    setShowPossiblities(value) {
        this.grid.computePossibilities(this.constraintChecker);
        this.showPossiblities = value;
    }
}