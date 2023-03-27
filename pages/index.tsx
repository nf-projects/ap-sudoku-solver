import {useEffect, useState} from "react";

interface CellProps {
    index: number;
    updateValue: (index: number, value: number | null) => void;
}

function Cell(props: CellProps) {
    const [oldValue, setOldValue] = useState<number | null>(null);

    return (
        <input
            key={props.index}
            type="number"
            min="1"
            max="9"
            onChange={(e) => {
                const value = parseInt(e.target.value);

                // not a number
                if (isNaN(value)) {
                    // set the value to the value stored in state (old value)
                    e.target.value = "";
                    props.updateValue(props.index, null);
                    return;
                }

                // make sure manually entered values are valid
                if (value < 1 || value > 9) {
                    // set the value to the value stored in state (old value)
                    e.target.value = String(oldValue || 0);
                    return;
                }

                setOldValue(value);
                props.updateValue(props.index, value);
            }}
            className="text-center border border-gray-300 bg-red-500 w-16 h-16 rounded-md"
        />
    );
}

export default function Home() {
    interface Cell {
        index: number;
        value: number | null;
    }

    const [board, setBoard] = useState<Cell[]>([]);

    // initialize the board on first render
    useEffect(() => {
        let newBoard: Cell[] = [];
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

    let inputElements = [];
    let count = 0;
    for (let i = 0; i < 9; i++) {
        let rowElements = [];

        for (let j = 0; j < 9; j++) {
            rowElements.push(<Cell key={count} index={count}
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