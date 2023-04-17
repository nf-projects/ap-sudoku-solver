import {useEffect, useState} from "react";
import {
    generateRandomBoardFast,
    isBoardValid,
    solveBoard
} from "@/util/SudokuUtil";

interface CellProps {
    index: number;
    updateValue: (index: number, value: number | null) => void;
    board: SudokuCellData[];
}

function SudokuCellElement(props: CellProps) {
    // maps index -> color id
    const colors = [
        0, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0, 0,
        1, 1, 1, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 1, 1, 1,
        0, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 0, 0, 0
    ];

    // maps color id -> color name
    const colorNames = [
        "bg-red-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-indigo-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-gray-500",
        "bg-black-500",
    ];

    // get the color id for this cell
    const colorId = colors[props.index];

    // get the color name for this cell
    const colorName = colorNames[colorId];

    const [oldValue, setOldValue] = useState<number | null>(null);

    return (
        <input
            key={props.index}
            type="number"
            min="1"
            value={props.board[props.index]?.value || ""}
            max="9"
            onInput={(e: any) => {
                const value = parseInt(e.target.value);

                // make sure manually entered values are valid
                if (isNaN(value) || value === 0) {
                    // set the value to the value stored in state (old value)
                    e.target.value = "";
                    props.updateValue(props.index, null);
                    return;
                } else if (value < 1 || value > 9) {
                    // set the value to the value stored in state (old value)
                    e.target.value = String(oldValue || 0);
                    return;
                }

                setOldValue(value);
                props.updateValue(props.index, value);
            }}
            className={"text-center border border-gray-300 text-4xl font-bold pl-4 w-20 h-20 rounded-md " + colorName}
        />
    );
}

export interface SudokuCellData {
    index: number;
    value: number | null;
}

export default function Home() {

    const [board, setBoard] = useState<SudokuCellData[]>([]);

    // initialize the board on first render
    useEffect(() => {
        let newBoard: SudokuCellData[] = [];
        for (let i = 0; i < 81; i++) {
            newBoard.push({index: i, value: null});
        }
        setBoard(newBoard);
    }, []);

    function updateBoardValue(index: number, value: number | null) {
        const newBoard = [...board];
        const cell = newBoard.find((cell) => cell.index === index);
        if (cell) {
            cell.value = value;
        }
        setBoard(newBoard);
    }

    // generate the <input> tags
    let inputElements = [];
    let count = 0;
    for (let i = 0; i < 9; i++) {
        let rowElements = [];

        for (let j = 0; j < 9; j++) {
            rowElements.push(<SudokuCellElement key={count} index={count}
                                                updateValue={(index, value) => {
                                                    updateBoardValue(index, value);
                                                    console.log(board);
                                                }} board={board}/>);

            count++;
        }

        inputElements.push(<div key={i} className="flex">{rowElements}</div>);
    }

    return (
        <div className="flex flex-col sm:flex-row sm:justify-center mx-auto">
            <div className="m-4">
                {inputElements}
            </div>
            <div>
                <h1 className="text-3xl font-bold">Sudoku Solver:</h1>
                <p className="max-w-md">
                    Welcome to my Sudoku solver! Input data with your keyboard
                    by clicking a cell on the board, then click "Solve Board".
                </p>
                <ul>
                    {/*<li>Is valid: {isBoardValid(board) ? "yes" : "no"}</li>*/}
                    <li className="text-lg font-bold">{isBoardValid(board) ? "This board is valid!" : "This board is not valid!"}</li>
                    <li>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                // sets everything to null
                                let newBoard = [...board];
                                for (let i = 0; i < 81; i++) {
                                    newBoard[i].value = null;
                                }

                                setBoard(newBoard);
                            }}
                        >Clear Board
                        </button>
                    </li>
                    {/*<li>*/}
                    {/*    <button*/}
                    {/*        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                    {/*        onClick={() => {*/}
                    {/*            const template = [*/}
                    {/*                6, 0, 3, 0, 0, 0, 0, 0, 4,*/}
                    {/*                0, 0, 0, 0, 0, 3, 0, 7, 0,*/}
                    {/*                0, 4, 5, 6, 2, 0, 0, 0, 0,*/}
                    {/*                8, 0, 0, 3, 7, 0, 0, 4, 0,*/}
                    {/*                0, 5, 0, 0, 0, 0, 0, 0, 6,*/}
                    {/*                0, 0, 0, 0, 1, 6, 0, 8, 2,*/}
                    {/*                5, 7, 8, 0, 6, 4, 3, 0, 9,*/}
                    {/*                0, 2, 0, 0, 0, 0, 1, 0, 7,*/}
                    {/*                1, 0, 6, 7, 9, 2, 4, 0, 8,*/}
                    {/*            ];*/}

                    {/*            let newBoard = [...board];*/}

                    {/*            for (let i = 0; i < 81; i++) {*/}
                    {/*                newBoard[i].value = template[i] === 0 ? null : template[i];*/}
                    {/*            }*/}

                    {/*            setBoard(newBoard);*/}
                    {/*        }}*/}
                    {/*    >Fill Board (Valid partial)*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <button*/}
                    {/*        className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                    {/*        onClick={() => {*/}
                    {/*            const template = [*/}
                    {/*                8, 2, 7, 1, 5, 4, 3, 9, 6,*/}
                    {/*                9, 6, 5, 3, 2, 7, 1, 4, 8,*/}
                    {/*                3, 4, 1, 6, 8, 9, 7, 5, 2,*/}
                    {/*                5, 9, 3, 4, 6, 8, 2, 7, 1,*/}
                    {/*                4, 7, 2, 5, 1, 3, 6, 8, 9,*/}
                    {/*                6, 1, 8, 9, 7, 2, 4, 3, 5,*/}
                    {/*                7, 8, 6, 2, 3, 5, 9, 1, 4,*/}
                    {/*                1, 5, 4, 7, 9, 6, 8, 2, 3,*/}
                    {/*                2, 3, 9, 8, 4, 1, 5, 6, 7*/}
                    {/*            ];*/}

                    {/*            let newBoard = [...board];*/}

                    {/*            for (let i = 0; i < 81; i++) {*/}
                    {/*                newBoard[i].value = template[i];*/}
                    {/*            }*/}

                    {/*            setBoard(newBoard);*/}
                    {/*        }}*/}
                    {/*    >Fill Board (Valid full)*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    <li>
                        <button
                            className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                const board = generateRandomBoardFast(30);

                                if (board) {
                                    setBoard(board);
                                }
                            }}
                        >Generate Random Unsolved Board (30 cells)
                        </button>
                    </li>
                    <li>
                        <button
                            className="mt-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                const result = solveBoard(board);

                                if (result) {
                                    setBoard(result);
                                } else {
                                    alert("No solution found!");
                                }
                            }}
                        >Solve Board
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}