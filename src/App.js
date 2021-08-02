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
// fix le problème de blackjack

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: "" /* 3 different states : homepage, game and result*/,
      score: 0,
      setTimer: null,
      timer: 300,
      result: false,
    };
  };

  // Fonction Timer qui limite la durée de la partie à n secondes
  gameTimer = () => {
    if (this.state.timer === 0) {
      this.setState((prevState) => ({
        ...prevState,
        setTimer: clearInterval(prevState.setTimer), // Stop le setInterval ////
        activeTab: "result", // Lance le component result
        result: false, // on passe au component result la valeur 'perdu' car le chrono est terminé
        timer: 300 // On reset le timer
      }), () => {
        console.log(this.state.setTimer)
      });  
    } else {
      console.log(this.state.setTimer)
      this.setState((prevState) => ({
            ...prevState,
            timer: prevState.timer - 1
        }));
    }
  }

  handleClickPlay = () => {
    let setTimerVar = setInterval(this.gameTimer, 1000)
    this.setState((prevState) => ({
      ...prevState,
      activeTab: "game",
      setTimer: setTimerVar
    }));
  };

  handleClickReplay = () => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: "",
    }))
  }

  endGame = (param) => {
    if (param === "win") {
      this.setState((prevState) => ({
        ...prevState,
        activeTab: "result",
        result: true,
        setTimer: clearInterval(prevState.setTimer),
        timer: 300,
      }))
    } else if (param === "lost") {
      this.setState((prevState) => ({
        ...prevState,
        activeTab: "result",
        result: false,
        setTimer: clearInterval(prevState.setTimer),
        timer: 300,
      }))
    }
  }

  render() {
    switch (this.state.activeTab) {
      case "game":
        return <RunningGame timer={this.state.timer} endGame = {this.endGame} />;
      case "result":
        return (
          <div className="text-center" style={{ color: "white" }}>
              <div className="flex">
              <img src="/img/title-app.png" alt="logo" style={{ width: "350px"}}></img>
              </div>
              <Result win={this.state.result} />
              <Button onClick={this.handleClickReplay}>Replay</Button>
          </div>          
          )
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
