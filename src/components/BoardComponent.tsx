import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    
}

const BoardComponent:FC<BoardProps> = ({board, setBoard}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const click = (cell: Cell) => {
        if(selectedCell && selectedCell!==cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            updateBoard();    
        }
        else setSelectedCell(cell);
    
    }

    useEffect(()=>{
        highlightCells()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCell])

    const highlightCells = () => {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    const updateBoard = ()=> {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }
    return ( 
        <div className="board"> 
            {board.cells.map((row, index)=>
                <React.Fragment key={index}>
                    {row.map(cell=>
                    <CellComponent 
                        click={click}
                        selected={cell.x===selectedCell?.x && cell.y===selectedCell?.y} 
                        key={cell.id} 
                        cell={cell}/>)}
                </React.Fragment>
            )}
        </div>
     );
}

export default BoardComponent;