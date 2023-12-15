import { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const ChessGame= () => {
 
  const [fen, setFen] = useState('start');
  const [game, setGame] = useState(new Chess() as unknown as Chess);
  const [elementos, setElementos] = useState(["0"]);
 
  const [nuevoElemento, setNuevoElemento] = useState('');
  const handleMove = (move: any) => {
    if (game.move(move)) {
      elementos.push(move.to);
   
      setElementos([...elementos]);
     
      setNuevoElemento('');
      console.log(elementos);
      setFen(game.fen());
    }
  };
  return (
    <div>
      <Chessboard
        position={fen}
        onDrop={(move) => handleMove({ from: move.sourceSquare, to: move.targetSquare, promotion: 'q' })}
        dropSquareStyle={{ boxShadow: 'inset 0 0 1px 4px #8F8' }}
        sparePieces={false}
      />
    </div>
  );
};
export { ChessGame };