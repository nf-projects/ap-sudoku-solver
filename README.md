# Instructions

- Clone the repository
- Install Node and NPM
- Run `npm install` to install dependencies
- Run `npm run dev` to start the development server
- Go to `localhost:3000` in your browser

**Describes the overall purpose of the program**
The overall purpose of the program is that the user
is able to input or randomly generate a Sudoku board,
and the program will validate and solve the board.

**Describes what functionality of the program is demonstrated in
the video**
The functionality of the program demonstrated in the video is
inputting a Sudoku board, validating if it is valid, solving it,
and generating new boards.

**Describes the input and output of the program demonstrated in
the video**
The input of the program is individual numbers ("cells") of
the Sudoku board and the action that the user wants to take
(whether it is to validate, solve, or generate a new board).
The output of the program is either a new board, a solved board,
or a message that the board is invalid.

**The first program code segment must show how data have been
stored in the list.**
const [board, setBoard] = useState<SudokuCellData[]>([]);

// updates a given board value
function updateBoardValue(index: number, value: number | null) {
const newBoard = [...board];
const cell = newBoard.find((cell) => cell.index === index);
if (cell) {
cell.value = value;
}
setBoard(newBoard);
}

**The second program code segment must show the data in the
same list being used, such as creating new data from the existing
data or accessing multiple elements in the list, as part of fulfilling
the program’s purpose.**
// When the program initially loads, the board is populated with null
// values to create an empty board:
useEffect(() => {
let newBoard: SudokuCellData[] = [];
for (let i = 0; i < 81; i++) {
newBoard.push({index: i, value: null});
}
setBoard(newBoard);
}, []);

**Identifies the name of the list being used in this response**
board

**Describes what the data contained in the list represent in your
program**
The data contained in the list represents the values of each cell
in the Sudoku board.

**Explains how the selected list manages complexity in your program
code by explaining why your program code could not be written, or
how it would be written differently, if you did not use the list**
The list is used to store the values of each cell in the board.
If this list would not be used, none of the program's functionality
would work because it would know nothing about the Sudoku board.
The only other approach would be to store 81 (9 * 9) separate integer
variables, but that would be very inefficient and have a lot of
code repetition.

**The first program code segment must be a student-developed
procedure that:
□ Defines the procedure’s name and return type (if necessary)
□ Contains and uses one or more parameters that have an effect
on the functionality of the procedure
□ Implements an algorithm that includes sequencing, selection,
and iteration**
/*
* Generates a random sudoku board with the specified number of cells
*/
export function generateRandomBoard(numberOfCells: number): SudokuCellData[] {
const board: SudokuCellData[] = [];
for (let i = 0; i < 81; i++) {
board.push({index: i, value: null});
}

    // solve the board
    const solvedBoard = solveBoard(board) || [];

    // remove cells until the desired number of cells is reached
    while (solvedBoard.filter(cell => cell.value !== null).length > numberOfCells) {
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

**The second program code segment must show where your
student-developed procedure is being called in your program.**
<button
className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
onClick={() => {
const board = generateRandomBoard(30);

        setBoard(board);
    }}

>
Generate Random Unsolved Board (30 cells)
</button>

**Describes in general what the identified procedure does and how it
contributes to the overall functionality of the program**
The identified procedure generates a random Sudoku board with the
specified number of cells.
This function contributes to the overall functionality of the program
because, without it, the "Generate Random Unsolved Board" button
would not work.

**Explains in detailed steps how the algorithm implemented in the
identified procedure works. Your explanation must be detailed
enough for someone else to recreate it.**
The identified procedure takes an empty Sudoku board (each value is set to null)
and solves it. Then, it uses a while loop to remove cells until the desired
number of cells is reached. Finally, it returns the solved board as an
array of SudokuCellData objects.

**Describes two calls to the procedure identified in written response
3c. Each call must pass a different argument(s) that causes a
different segment of code in the algorithm to execute.
First call:**
a

**Second call:**
a

**Describes what condition(s) is being tested by each call to the
procedure
Condition(s) tested by the first call:**
a

**Condition(s) tested by the second call:**
a

**Identifies the result of each call
Result of the first call:**
a

**Result of the second call:**
a

