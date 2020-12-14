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

  onNumberClick = (number, status) => {
    console.log(number, status);
  };

  render() {
    return (
      <>
        <StarDisplay count={this.stars} />
        <PlayNumber number={1} status={"used"} onClick={this.onNumberClick} />
        <PlayAgain gameStatus={"lost"} onClick={() => {}} />
      </>
    );
  }
}
