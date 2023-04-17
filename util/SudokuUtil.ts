// returns whether or not a sudoku board is valid
import {SudokuCellData} from "@/pages";

let operations = 0;

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
                operations++;
                continue;
            }

            // make sure it's a valid number
            if (cell.value && (cell.value < 1 || cell.value > 9)) {
                operations++;
                return false;
            }

            // check if it's already present in the same row
            if (cell.value && rows[row].includes(cell.value)) {
                operations++;
                return false;
            } else {
                operations++;
                rows[row].push(cell.value);
            }

            // check if it's already present in the same column
            if (cell.value && columns[col].includes(cell.value)) {
                operations++;
                return false;
            } else {
                operations++;
                columns[col].push(cell.value);
            }

            // check if it's already present in the same box
            const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
            if (cell.value && boxes[boxIndex].includes(cell.value)) {
                operations++;
                return false;
            } else {
                operations++;
                boxes[boxIndex].push(cell.value);
            }
        }
    }

    return true;
}

export function solveBoard(board: SudokuCellData[]): SudokuCellData[] | null {
    // helper function to get the next empty cell to fill in the board
    function getNextEmptyCell(): SudokuCellData | null {
        for (let i = 0; i < board.length; i++) {
            if (board[i].value === null) {
                return board[i];
            }
        }
        return null;
    }

    // check if the current board is valid
    if (!isBoardValid(board)) {
        return null;
    }

    // get the next empty cell
    const nextEmptyCell = getNextEmptyCell();

    // if there are no empty cells, the board is solved
    if (!nextEmptyCell) {
        console.log(operations);
        operations = 0;
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

// this function is a lot faster because it just takes an empty board and solves it instead of generating a random solution
export function generateRandomBoardFast(providedCells: number): SudokuCellData[] {
    const board: SudokuCellData[] = [];
    for (let i = 0; i < 81; i++) {
        board.push({index: i, value: null});
    }

    // solve the board
    const solvedBoard = solveBoard(board) || [];

    // remove cells until the desired number of cells is reached
    while (solvedBoard.filter(cell => cell.value !== null).length > providedCells) {
        // get a random cell
        const randomCell = solvedBoard[Math.floor(Math.random() * solvedBoard.length)];

        // if the cell is already empty, try again
        if (randomCell.value === null) {
            continue;
        }

        // remove the cell
        randomCell.value = null;
    }

    return solvedBoard;
}