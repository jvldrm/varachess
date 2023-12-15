
import "./Game.css";
import React, {FC, ReactNode, SyntheticEvent} from "react";

import rook_w from "./Chess_rlt45.svg";



function Game() {

  return (
    <>
      <h1>The game page</h1>
      <div className="board">
        <div className="row">
          <div className="block"> </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
        </div>
        <div className="row">
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
        </div>

        <div className="row">
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
        </div>
        <div className="row">
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
        </div>

        <div className="row">
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
        </div>
        <div className="row">
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
        </div>

        <div className="row">
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
          <div className="block"> x </div>  <div className="blockB"> z </div>
        </div>
        <div className="row">
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> x </div>  <div className="block"> z </div>
          <div className="blockB"> <img src={rook_w} alt="rook white"/> </div>  
         
        </div>


      </div>
    </>

  );
}

export { Game };
