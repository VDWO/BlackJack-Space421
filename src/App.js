import React from "react";
// CSS
import "./App.css";
// Components
import Button from "./Components/Button";
import Result from "./Components/Result";
import Rules from "./Components/Rules";
import RunningGame from "./Components/RunningGame";

// To do : fonction is-valid/is-invalid 
// Result components
// New API + 1 car
// fix le problème de blackjack

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: "" /* 3 different states : homepage, game and result*/,
      score: 0,
      setTimer: null,
      timer: 300,
    };
  };

  // Fonction Timer qui limite la durée de la partie à n secondes
  gameTimer = () => {
    if (this.state.timer === 0) {
      this.setState((prevState) => ({
        ...prevState,
        setTimer: clearInterval(prevState.setTimer), // Stop le setInterval
    }));
      // Lance le component end avec la valeur perdu
    } else {
      this.setState((prevState) => ({
            ...prevState,
            timer: prevState.timer - 1
        }));
    }
  }

  handleClickPlay = () => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: "game",
      setTimer: setInterval(this.gameTimer, 1000)
    }));
  };

  render() {
    switch (this.state.activeTab) {
      case "game":
        return <RunningGame timer={this.state.timer}/>;
      case "result":
        return <Result />;
      default:
        return (
          <div className="pt-3 bck-image">
            <div className="flex">
              <img src="/img/title-app.png" alt="logo" style={{ width: "350px"}}></img>
            </div>

            <div className="rules-container">
              <Rules />
            </div>

            <div className="d-flex justify-content-center button-container">
              <Button onClick={this.handleClickPlay}>Play</Button>
            </div>
          </div>
        );
    };
  };
};

export default App;
