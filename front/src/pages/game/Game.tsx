
import "./Game.css";
import React, {FC, ReactNode, SyntheticEvent} from "react";

import rook_w from "./Chess_rlt45.svg";
import {ChessGame} from "./ChessGame";


function Game() {

  return (
    <>
      <h1>The game page</h1>
      <ChessGame />
      
    </>

  );
}

export { Game };
