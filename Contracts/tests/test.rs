//use std::u8;
use gtest::{Log, Program, System};
use varachess_io::{ChessMessageIn,ChessCoordinate,ChessMovementDetails};

#[test]
fn hello_test() {
    let sys = System::new();
    sys.init_logger();
    let program = Program::current(&sys);
    program.send(2, String::from("INIT MESSAGE"));
    program.send(2, ChessMessageIn::RequestStartGame);
    let origin = ChessCoordinate{x:0,y:1};
    let destination = ChessCoordinate{x:0,y:3};
    let movement = ChessMovementDetails{coordinate_ini:origin,coordinate_end:destination};
    program.send(2, ChessMessageIn::ExecuteMovement(movement));    
}
