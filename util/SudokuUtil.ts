// returns whether or not a sudoku board is valid
import {SudokuCellData} from "@/pages";

export function isBoardValid(board: SudokuCellData[]): boolean {
    const rows: number[][] = [];
    const columns: number[][] = [];
    const boxes: number[][] = [];

    // initialize rows, columns, and boxes empty arrays
    for (let i = 0; i < 9; i++) {
        rows.push([]);
        columns.push([]);
        boxes.push([]);
    }

    // check each cell to make sure it isn't already present in the row, column, or box
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = board[row * 9 + col];

            if (cell == null || cell.value == null) {
                return false;
            }

            // make sure it's a valid number
            if (cell.value && (cell.value < 1 || cell.value > 9)) {
                return false;
            }

            // check if it's already present in the same row
            if (cell.value && rows[row].includes(cell.value)) {
                return false;
            } else {
                rows[row].push(cell.value);
            }

            // check if it's already present in the same column
            if (cell.value && columns[col].includes(cell.value)) {
                return false;
            } else {
                columns[col].push(cell.value);
            }

            // check if it's already present in the same box
            const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
            if (cell.value && boxes[boxIndex].includes(cell.value)) {
                return false;
            } else {
                boxes[boxIndex].push(cell.value);
            }
        }
    }

    return true;
}