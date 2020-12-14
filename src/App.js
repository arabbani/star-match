import React from "react";

import "./App.css";

import Game from "./components/game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 1,
    };
  }

  startNewGame = () => this.setState((state) => ({ gameId: state.gameId + 1 }));

  render() {
    return (
      <Game
        key={this.state.gameId.toString()}
        startNewGame={this.startNewGame}
      />
    );
  }
}

export default App;
