
import "./Game.css";
import React, { FC, ReactNode, SyntheticEvent } from "react";

import rook_w from "./Chess_rlt45.svg";
import { ChessGame } from "./ChessGame";
import { PlayButton } from "./PlayButton";
import { EndButton } from "./EndButton";
import { HStack, VStack} from "@chakra-ui/react";


function Game() {

  return (
    <>
      <h1>The game page</h1>
      <VStack>


        <ChessGame />
        <HStack>
          <PlayButton />
          <EndButton />
        </HStack>
      </VStack>

    </>

  );
}

export { Game };
