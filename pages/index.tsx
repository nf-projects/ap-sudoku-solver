import {useEffect, useState} from "react";

interface CellProps {
    index: number;
    updateValue: (index: number, value: number | null) => void;
}

function SudokuCellElement(props: CellProps) {
    // maps index -> color id
    const colorBlindColors = [
        0, 0, 0, 1, 1, 1, 2, 2, 2,
        0, 0, 0, 1, 1, 1, 2, 2, 2,
        0, 0, 0, 1, 1, 1, 2, 2, 2,
        3, 3, 3, 4, 4, 4, 5, 5, 5,
        3, 3, 3, 4, 4, 4, 5, 5, 5,
        3, 3, 3, 4, 4, 4, 5, 5, 5,
        6, 6, 6, 7, 7, 7, 8, 8, 8,
        6, 6, 6, 7, 7, 7, 8, 8, 8,
        6, 6, 6, 7, 7, 7, 8, 8, 8
    ];

    const normalColors = [
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
    const colorId = normalColors[props.index];

    // get the color name for this cell
    const colorName = colorNames[colorId];

    const [oldValue, setOldValue] = useState<number | null>(null);

    return (
        <input
            key={props.index}
            type="number"
            min="1"
            max="9"
            onChange={(e) => {
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
            className={"text-center border border-gray-300 text-4xl font-bold pl-4 w-20 h-20 rounded-md" + " " + colorName}
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
                                                }}/>);

            count++;
        }

        inputElements.push(<div key={i} className="flex">{rowElements}</div>);
    }

    return (
        <div className="flex justify-center">
            <div className="m-4">
                {inputElements}
            </div>
        </div>
    );
}