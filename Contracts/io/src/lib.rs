#![no_std]

//use std::io::Empty;

use codec::{Decode, Encode};
use gmeta::{InOut, Metadata, Out};
use gstd::{debug, prelude::*, ActorId};
use scale_info::TypeInfo;
pub struct ProgramMetadata;

const BOARD_SIZE: usize = 8;

impl Metadata for ProgramMetadata {
    type Init = ();
    type Handle = InOut<ChessMessageIn, ChessMessageOut>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = Out<ChessState>;
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub enum ChessMessageIn {
    RequestStartGame,
    AcceptStartGame,
    ExecuteMovement(ChessMovementDetails),
    DrawRequest,
    EndGame,
    CoronationPieceSelected(ChessCoronationDetail),
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct ChessCoronationDetail {
    pub coordinate_ini: ChessCoordinate,
    pub coordinate_end: ChessCoordinate,
    pub piece: Piece,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub enum ChessMessageOut {
    RequestStartGameInitated,
    AcceptStartGameInitiated,
    MovementExecuted,
    CheckFound,
    CheckMateFound,
    CoronationFound,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct ChessMovementDetails {
    pub coordinate_ini: ChessCoordinate,
    pub coordinate_end: ChessCoordinate,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct ChessCoordinate {
    pub x: u8,
    pub y: u8,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub enum Color {
    White,
    Black,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub enum Piece {
    Pawn(Color),
    Tower(Color),
    Knight(Color),
    Bishop(Color),
    Queen(Color),
    King(Color),
    Emoty,
}

/* */
#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct ChessBox {
    piece: Option<Piece>,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct ChessState {
    pub players: Vec<ChessPlayer>,
    pub board: [[Piece; BOARD_SIZE]; BOARD_SIZE],
}

impl ChessState {
    pub fn print_board(&mut self) {
        for _j in 0..BOARD_SIZE {
            for _i in 0..BOARD_SIZE {
               // debug!("{:?} ", _i);
                debug!("{:?}",self.board[_j][_i]);
            }
            debug!("");
        }
        debug!("");
    }

    pub fn movement(&mut self,_movement:ChessMovementDetails){
 //       self.board[movement.coordinate_end.x][movement.coordinate_end.y]=self.board[][movement.coordinate_ini.y];
 //       self.board[movement.coordinate_ini.x][movement.coordinate_ini.y]= Piece::Emoty;
        debug!("{:?}",_movement);
    }

    pub fn reset_game(&mut self) {
        //Clear players
        self.players = vec![];

        //Set default pieces
        for _i in 0..BOARD_SIZE {
            for _j in 0..BOARD_SIZE {
                self.board[_j][_i] = Piece::Emoty;
            }
        }
    }

    pub fn new_game(&mut self) {
        //Initialize Pawns
        for i in 0..BOARD_SIZE {
            self.board[1][i] = Piece::Pawn(Color::Black);
            self.board[BOARD_SIZE - 2][i] = Piece::Pawn(Color::White);
        }

        // Initialize Towers
        self.board[0][0] = Piece::Tower(Color::Black);
        self.board[0][BOARD_SIZE - 1] = Piece::Tower(Color::Black);
        self.board[BOARD_SIZE - 1][0] = Piece::Tower(Color::White);
        self.board[BOARD_SIZE - 1][BOARD_SIZE - 1] = Piece::Tower(Color::White);

        // Initialize Knights
        self.board[0][1] = Piece::Knight(Color::Black);
        self.board[0][BOARD_SIZE - 2] = Piece::Knight(Color::Black);
        self.board[BOARD_SIZE - 1][1] = Piece::Knight(Color::White);
        self.board[BOARD_SIZE - 1][BOARD_SIZE - 2] = Piece::Knight(Color::White);

        // Initialize Bishopes
        self.board[0][2] = Piece::Bishop(Color::Black);
        self.board[0][BOARD_SIZE - 3] = Piece::Bishop(Color::Black);
        self.board[BOARD_SIZE - 1][2] = Piece::Bishop(Color::White);
        self.board[BOARD_SIZE - 1][BOARD_SIZE - 3] = Piece::Bishop(Color::White);

        // Initialize Queens
        self.board[0][3] = Piece::Queen(Color::Black);
        self.board[BOARD_SIZE - 1][4] = Piece::Queen(Color::White);

        // Initialize Kings
        self.board[0][4] = Piece::King(Color::Black);
        self.board[BOARD_SIZE - 1][3] = Piece::King(Color::White);
    }
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct ChessPlayer {
    pub player_id: ActorId,
    pub player_name: String,
    pub player_nickname: String,
    pub player_points: u16,
    pub player_pieces: Vec<ChessPieces>,
    pub player_friends: Vec<ActorId>,
}

#[derive(Encode, Decode, TypeInfo, Debug)]
pub struct ChessPieces {
    pub player_piece: Vec<u8>,
}
