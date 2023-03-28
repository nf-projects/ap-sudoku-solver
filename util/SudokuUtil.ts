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
                continue;
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

export function solveBoard(board: SudokuCellData[]): SudokuCellData[] | null {
    // helper function to get the next empty cell to fill in the board
    const getNextEmptyCell = (): SudokuCellData | null => {
        for (let i = 0; i < board.length; i++) {
            if (board[i].value === null) {
                return board[i];
            }
        }
        return null;
    };

    // check if the current board is valid
    if (!isBoardValid(board)) {
        return null;
    }

    // get the next empty cell
    const nextEmptyCell = getNextEmptyCell();

    // if there are no empty cells, the board is solved
    if (!nextEmptyCell) {
        return board;
    }

    // try each possible value for the empty cell
    for (let value = 1; value <= 9; value++) {
        // create a copy of the board with the current value inserted into the empty cell
        const updatedBoard = [...board];
        updatedBoard[nextEmptyCell.index] = {index: nextEmptyCell.index, value};

        // recursively solve the updated board
        const solvedBoard = solveBoard(updatedBoard);

        // if a solution is found, return it
        if (solvedBoard) {
            return solvedBoard;
        }
    }

    // If no solution is found, return null
    return null;
}
