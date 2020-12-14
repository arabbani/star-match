import React from "react";

import PlayNumber from "./play-number";
import PlayAgain from "./play-again";
import StarDisplay from "./star-display";
import utils from "../utils";

export default class Game extends React.Component {
  intervalId;
  constructor(props) {
    super(props);
    this.state = {
      stars: utils.random(1, 9),
      availableNumbers: utils.range(1, 9),
      candidateNumbers: [],
      secondsLeft: 15,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.secondsLeft > 0) {
        this.setState((state) => ({
          secondsLeft: state.secondsLeft - 1,
        }));
      } else if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearImmediate(this.intervalId);
    }
  }

  gameStatus = () => {
    if (this.state.availableNumbers.length === 0) {
      clearInterval(this.intervalId);
      return "won";
    } else if (this.state.secondsLeft === 0) {
      return "lost";
    }
    return "active";
  };

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

  setGameState = (newCandidateNumbers) => {
    if (utils.sum(newCandidateNumbers) !== this.state.stars) {
      this.setState({
        candidateNumbers: newCandidateNumbers,
      });
    } else {
      const newAvailableNumbers = this.state.availableNumbers.filter(
        (availableNumber) => !newCandidateNumbers.includes(availableNumber)
      );
      this.setState({
        stars: utils.randomSumIn(newAvailableNumbers, 9),
        availableNumbers: newAvailableNumbers,
        candidateNumbers: [],
      });
    }
  };

  onNumberClick = (number, status) => {
    if (this.state.secondsLeft === 0) {
      return;
    }
    const newCandidateNumbers =
      status === "available"
        ? this.state.candidateNumbers.concat(number)
        : this.state.candidateNumbers.filter(
            (candidateNumber) => candidateNumber !== number
          );
    this.setGameState(newCandidateNumbers);
  };

  render() {
    return (
      <div className="game">
        <div className="instruction">
          Pick 1 or more numbers to make the sum equal to the number of stars
        </div>
        <div className="timer">
          Time Remaining:{" "}
          <span
            style={{
              color: this.state.secondsLeft < 5 ? "red" : "",
            }}
          >
            {this.state.secondsLeft}
          </span>
        </div>
        <div className="playground">
          <div className="game-state">
            {this.gameStatus() !== "active" ? (
              <PlayAgain
                gameStatus={this.gameStatus()}
                onClick={this.props.startNewGame}
              />
            ) : (
              <StarDisplay count={this.state.stars} />
            )}
          </div>
          <div className="number-display">
            {utils.range(1, 9).map((number) => (
              <PlayNumber
                key={number.toString()}
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
