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
      result: true,
    };
  };

  handleClickPlay = () => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: "result",
    }));
  };

  handleClickReplay = () => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: "",
    }))
  }

  render() {
    switch (this.state.activeTab) {
      case "game":
        return <RunningGame />;
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
