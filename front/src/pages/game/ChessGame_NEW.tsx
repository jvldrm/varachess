import { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { useEffect } from 'react';
import { Radio, RadioGroup, Stack, Input } from '@chakra-ui/react'

const ChessGame = () => {

    const [fen, setFen] = useState('start');
    const [game, setGame] = useState(new Chess());
    const [elementos, setElementos] = useState<string[]>(new Array<string>());
    const [turno, setTurno] = useState('w');

    const [nuevoElemento, setNuevoElemento] = useState('');

    const [playerColor, setPlayerColor] = useState('w');
    const [playerId, setPlayerId] = useState('0');
    const [gameId, setGameId] = useState('0');

    // initial state fen : rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    const initFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const encodedInitFEN = encodeURI(initFen);

    useEffect(() => {
        setTurno(game.turn());
        // 'http://localhost:5000/test_get?player_id=999&player_color=green'
        // `http://localhost:5000/play?player_id=${playerId}&game_id=${gameId}&player_color=${playerColor}&fen=ppppp`
        console.log('this is the url to get: ' + `http://localhost:5000/play?player_id=${playerId}&player_color=${playerColor}&game_id=${gameId}&fen=pppp`)
        console.log("This is the encoded FEN init" + encodedInitFEN);
        fetch(`http://localhost:5000/play?player_id=${playerId}&player_color=${playerColor}&game_id=${gameId}&fen=${encodedInitFEN}`)
            .then(response => response.json())
            .then(data => {
                console.log("this is the fetched data")

                console.log(JSON.stringify(data))
                game.load(data.fen);
                /* setFen(data.fen)
                game.load(  data.fen ); 
                */
                setTurno(data.turn)
                if (game.turn() != data.turn) {
                    console.log("PROBLEM!! the turns are out of sync!!")
                } else {
                    console.log("TURNS are in sync :) ")
                }
            })
            .catch(error => console.error(error));


    })

    const handleMove = (move: any) => {


        console.log(move);
        let move_in = { from: move.sourceSquare, to: move.targetSquare, promotion: 'q' };

        let destination = move_in.to;
        let destination_position = destination.substr(destination.length - 2, 2);

        console.log("I want to go to: " + destination_position)



        let move_res = game.moves({ square: move_in.from });
        let objectPiece = game.get(move_in.from);
        console.log("You want to move:" + objectPiece.color + " - " + objectPiece.type);
        console.log("These are the movements " + move_res);

        let move_res_f = move_res.map((s: string) => {
            return s.substr(s.length - 2, 2)
        });

        console.log("These are the movements (AGAIN): " + move_res_f);

        let valid_position = move_res_f.indexOf(destination_position);

        console.log("This is found at the array of possible landing positions: " + valid_position)

        /* || objectPiece.color === turno */
        if (turno == objectPiece.color && turno == playerColor) {


            let move_verb = game.moves({ square: move_in.from, verbose: true });
            console.log(move_verb);
            let found: boolean = false;
            move_verb.forEach(
                (m: any) => {
                    console.log("*** Move to: " + m.to + " has flags " + m.flags);
                    if (m.to == move_in.to) {
                        found = true;
                        console.log("------>This is where it will land")
                        setFen(m.after);
                        game.load(m.after);

                        const encodedNewFEN = encodeURI(m.after);

                        fetch(`http://localhost:5000/play?player_id=${playerId}&game_id=${gameId}&player_color=${playerColor}&fen=${encodedNewFEN}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                /* setFen(data.fen)
                                game.load(  data.fen ); 
                                */
                                setTurno(data.turn)
                                if (game.turn() != data.turn) {
                                    console.log("PROBLEM!! the turns are out of sync!!")
                                } else {
                                    console.log("TURNS are in sync :) ")
                                }
                            })
                            .catch(error => console.error(error));


                    }
                }

            );

        } else {
            console.log("TURN FOR OTHER PLAYER")
        }

    };

    const handleSnapEnd = (move: any) => {
        console.log("testing letting go");
    }

    const handlePieceClick = (square: any) => {
        console.log("Testing Clicked on  " + square);
        return true
    }

    function RadioColorSelect() {

        return (
            <RadioGroup onChange={setPlayerColor} value={playerColor}>
                <Stack direction='row'>
                    <Radio value='w'>WHITE</Radio>
                    <Radio value='b'>BLACK</Radio>

                </Stack>
            </RadioGroup>
        )
    }

    function InputPlayerIdState() {
        return (
            <input type='text' onChange={e => setPlayerId(e.target.value)} value={playerId} />
        )
    }


    return (
        <div>
            <Chessboard
                position={fen}
                onDrop={(move) => handleMove(move)}
                dropSquareStyle={{ boxShadow: 'inset 0 0 1px 4px #8F8' }}
                sparePieces={false}
                draggable={true}
                onMouseOutSquare={handleSnapEnd}
                onSquareClick={handlePieceClick}
            />

            <h1> TURN: {turno == 'w' ? 'WHITE' : 'BLACK'} IS NEXT (You are {playerColor} Player ID: {playerId} Game ID: {gameId})</h1>
            <RadioColorSelect />
            <p> Player ID: </p>
            <input style={{ color: "blue" }} type='text' onChange={e => setPlayerId(e.target.value)} value={playerId} />
            <p> Game ID: </p>
            <input style={{ color: "red" }} type='text' onChange={e => setGameId(e.target.value)} value={gameId} />

        </div>
    );
};
export { ChessGame };