import React from "react";
// CSS
import "./Player.modules.css";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Components 
import Button from "./Button";
import Card from "./Card";
// Importation image/gif
//import {cagnotte} from "./img/compteur.gif"


class Player extends React.Component {
constructor() {
  super()

  this.state = {
    temporyBet: 0,
  }
}


  handleUpdateBet = () => {
    const param = this.state.temporyBet
    console.log(param)

    this.props.updateBet(param)
  };

  temporyBet = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      temporyBet: parseInt(e.target.value),
    }));
  };

  renderSwitch() {
    const expr = this.props.isBetState;
    switch (expr) {

        case "bet":

          return (
            <div className="container white-text d-flex flex-column">
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

            {/* <Card bankHand={this.props.bankHand}/> */}

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

              <span className={(this.props.bankHandValue > this.props.playerHandValue && this.props.bankHandValue < 21) 
                ? "badge bg-success text-dark width-value mb" 
                : "badge bg-danger text-dark width-value mb"}>{this.props.bankHandValue}</span> 

              <div className="d-flex flex-row bd-highlight mb">
                {this.props.bankHand.map(card =>
                  <Card img = {card}/>)}
              </div>

                <span className={(this.props.playerHandValue > this.props.bankHandValue && this.props.playerHandValue < 21)
                ? "badge bg-success text-dark width-value mb"
                : "badge bg-danger text-dark width-value mb"}>{this.props.playerHandValue}</span>

              <div className="d-flex flex-row bd-highlight mb">
                {this.props.playerHand.map(card =>
                  <Card img = {card}/>)}
              </div>

              <div className="d-flex justify-content-around">
                <Button onClick={this.props.nextRound}>Continue</Button> 
              </div>
            </div>
            );

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