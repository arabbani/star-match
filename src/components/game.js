import React from "react";

import PlayNumber from "./play-number";
import PlayAgain from "./play-again";
import StarDisplay from "./star-display";
import utils from "../utils";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: utils.random(1, 9),
      availableNumbers: utils.range(1, 9),
      candidateNumbers: [],
    };
  }

  gameStatus = () =>
    this.state.availableNumbers.length === 0 ? "won" : "active";

  candidatesAreWrong = () =>
    utils.sum(this.state.candidateNumbers) > this.state.stars;

  numberStatus = (number) => {
    if (!this.state.availableNumbers.includes(number)) {
      return "used";
    }

    if (this.state.candidateNumbers.includes(number)) {
      return this.candidatesAreWrong() ? "wrong" : "candidate";
    }

    return "available";
  };

  onNumberClick = (number, status) => {
    console.log(number, status);
  };

  render() {
    return (
      <div className="game">
        <div className="instruction">
          Pick 1 or more numbers to make the sum equal to the number of stars
        </div>
        <div className="playground">
          <div className="game-state">
            {this.gameStatus() !== "active" ? (
              <PlayAgain
                gameStatus={this.gameStatus()}
                onClick={() => {
                  console.log("PLAY AGAIN");
                }}
              />
            ) : (
              <StarDisplay count={this.state.stars} />
            )}
          </div>
          <div className="number-display">
            {utils.range(1, 9).map((number) => (
              <PlayNumber
                key={number}
                number={number}
                status={this.numberStatus(number)}
                onClick={this.onNumberClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
