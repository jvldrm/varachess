#![no_std]
use gstd::{debug, msg, prelude::*};
use varachess_io::{ChessMessageIn, ChessMessageOut, ChessState, ChessMovementDetails};

static mut CHESS_STATE: Option<ChessState> = None;

#[no_mangle]
extern "C" fn init() {
    debug!("Starting init");
    let mut _state = unsafe { CHESS_STATE.as_mut() };
    unsafe { _state.unwrap_unchecked().reset_game() };
}

#[no_mangle]
extern "C" fn handle() {
    debug!("Starting handle");
    let _action: ChessMessageIn = msg::load().expect("Error in msg::load (handle)");
    let _state = state_mut();
    match _action {
        ChessMessageIn::RequestStartGame => {
            _state.new_game();
            //_state.print_board();
            msg::reply(ChessMessageOut::AcceptStartGameInitiated, 0)
                .expect("Problem with AcceptStartGameInitiated response");
        }
        ChessMessageIn::ExecuteMovement(movement) => {
            debug!(" ** Movement Detail: {:?}", movement);
            _state.movement(movement);
            _state.print_board();
            msg::reply(ChessMessageOut::MovementExecuted, 0)
                .expect("Problem with MovementExecuted response");
        }
        ChessMessageIn::AcceptStartGame => todo!(),
        ChessMessageIn::DrawRequest => todo!(),
        ChessMessageIn::EndGame => todo!(),
        ChessMessageIn::CoronationPieceSelected(_) => todo!(),
    }
}

#[no_mangle]
extern "C" fn handle_reply() {}

fn state_mut() -> &'static mut ChessState {
    let _state = unsafe { CHESS_STATE.as_mut() };
    unsafe { _state.unwrap_unchecked() }
}

#[no_mangle]
extern "C" fn state() {
    let chess = unsafe {
        CHESS_STATE
            .as_ref()
            .expect("The contract is not initialized")
    };
    msg::reply(chess, 0).expect("Failed to share state");
}
