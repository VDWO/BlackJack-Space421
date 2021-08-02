import React from "react";
// CSS
import "./Player.modules.css";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Components 
import Button from "./Button";
import Card from "./Card";
// Importation image/gif
// import {cagnotte} from "./img/compteur.gif"


class Player extends React.Component {
constructor() {
  super()

  this.state = {
    temporyBet: 0,
  }
}


  handleUpdateBet = () => {
    const param = this.state.temporyBet

    this.props.updateBet(param)
  };

  temporyBet = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      temporyBet: parseInt(e.target.value),
    }));
  };

  renderClass(param, param2) {
    if (this.props[`${param}`] > 21) {
      return "badge bg-danger text-dark width-value mb"
    } else if (this.props[`${param2}`] > 21) {
      return "badge bg-success text-dark width-value mb"
    } else if (this.props[`${param}`] < this.props[`${param2}`]) {
      return "badge bg-danger text-dark width-value mb"
    } else if (this.props[`${param}`] > this.props[`${param2}`]) {
      return "badge bg-success text-dark width-value mb"
    } else { // égalité
      return "badge bg-info text-dark width-value mb"
    }  
  };

  renderSwitch() {
    const expr = this.props.isBetState;
    switch (expr) {

        case "bet":

          return (
            <div className="container white-text d-flex flex-column d-flex flex-column justify-content-center align-items-center mb3">
              <img src="/img/title-app.png" alt="logo" style={{ width: "350px"}}></img>
              {/* <img src={cagnotte} alt="compteurCagnotte">{this.props.playerCash}€</img> */}
              <p>{this.props.playerCash}€</p>
              <form>
                <label for="bet-input">Chose your bet</label>
                <input type="text" min="0" id="bet-input" max={this.props.playerCash} onChange={this.temporyBet} className="form-control mb" aria-label="Dollar amount (with dot and two decimal places)"></input>
              </form>
              <Button onClick={this.handleUpdateBet}>Continue</Button>
            </div>
          );

        case "play":

          return (
          <div className="container bck-marine white-text d-flex flex-column">
            {/* <img src={cagnotte} alt="compteurCagnotte">{this.props.playerCash}€</img> */}
            <p>{this.props.playerCash}€</p>
            <p className="text-center">Your bet: {this.props.bet}€</p>

            <div className="d-flex flex-row bd-highlight mb">
              {this.props.bankHand.slice(0, 1).map(card =>
                <Card img = {card}/>)}
                Carte retournée
                
            </div>

            <span className="badge bg-warning text-dark mb width-value">{this.props.playerHandValue}</span>

            <div className="d-flex flex-row bd-highlight mb">
              {this.props.playerHand.map(card =>
                <Card img = {card}/>)}
            </div>

            <div className="d-flex justify-content-around">
              <Button onClick={this.props.onClickPlay}>Card</Button>
              <Button onClick={this.props.updateCash}>Pass</Button>
            </div>
            </div>
            );

        case "result":
          
          return (
          <div className="container bck-marine white-text d-flex flex-column">
            {/* <img src={cagnotte} alt="compteurCagnotte">{this.props.playerCash}€</img> */}
              <p>{this.props.playerCash}€</p>
              <p className="text-center">Your bet: {this.props.bet}€</p>

              <span className={this.renderClass("bankHandValue", "playerHandValue")}>{this.props.bankHandValue}</span> 
              

              <div className="d-flex flex-row bd-highlight mb">
                {this.props.bankHand.map(card =>
                  <Card img = {card}/>)}
              </div>

                <span className={this.renderClass("playerHandValue", "bankHandValue")}>{this.props.playerHandValue}</span>

              <div className="d-flex flex-row bd-highlight mb">
                {this.props.playerHand.map(card =>
                  <Card img = {card}/>)}
              </div>

              <div className="d-flex justify-content-around">
                <Button onClick={this.props.nextRound}>Continue</Button> 
              </div>
            </div>
            );

          case "blackjack":
            return(
              <div className="container d-flex flex-column justify-content-center align-items-center mb3">
                <img src="/img/title-app.png" alt="logo" style={{ width: "350px"}}></img>

                <div className="white-text size mb3">Player</div>

                <span className="white-text size mb3">BLACK JACK</span>

                <Button onClick={this.props.blackJack}>Continue</Button>
              </div>
            )

      default:
      console.log(`Error Game State`);
      }
  };
  
  render() {
    return(
      <div>
        {this.renderSwitch()}
      </div>
    );
  };

};

export default Player;