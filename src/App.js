import React from "react";
// CSS
import "./App.css";
// Components
import Button from "./Components/Button";
import Result from "./Components/Result";
import Rules from "./Components/Rules";
import RunningGame from "./Components/RunningGame";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: "" /* 3 different states : homepage, game and result*/,
      score: 0,
    };
  }

  handleClickPlay = () => {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: "game",
    }));
  };

  render() {
    switch (this.state.activeTab) {
      case "game":
        return <RunningGame />;
      case "result":
        return <Result />;
      default:
        return (
          <div className="pt-3" >
            <div className="flex">
              <img src="/img/title-app.png" alt="logo" style={{ width: "350px"}}></img>
            </div>
            <Rules />
            <Button onClick={this.handleClickPlay}>Play</Button>
          </div>
        );
    }
  }
}

export default App;
