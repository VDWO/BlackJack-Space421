import React from "react";
// CSS
import "./Player.modules.css";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Components 
import Button from "./Button"

const source = "https://deckofcardsapi.com/static/img";

class Player extends React.Component {

  constructor() {
    super();

    this.state = {
      betPlayer: 0,
      betTotal: 0,
      image: "",
      isBet: false,
    }
  }

  // Requête API
  deckCard = (cardValue) => {
    cardValue = "6D";

    fetch(`${source}/${cardValue}.png`)
    .then(res => res.blob())
    .then(img => {
      const cardImage = URL.createObjectURL(img);

      this.setState(prevState => ({
        ...prevState,
        image: cardImage
      }));
    });
  };

  // View bet => lors ce que le joueur selectionne sa mise
  updateBetPlayer = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        betPlayer: parseInt(e.target.value),
      };
    });
  };

  validateBet= () => {
    return (
      this.setState(prevState => {
      return {
        ...prevState,
        betTotal: prevState.betPlayer + prevState.betTotal,
        isBet: true,
      }})
    );
  };

  render() {
    if (this.state.isBet === false)
      return <div className="container white-text d-flex flex-column ">
                <p className="text-center">Chose your bet:</p>
                <p className="text-center">{this.state.betPlayer}€</p>
                <input type="range" min="0" max={this.props.playerCash} onChange={this.updateBetPlayer}></input>
                <Button onClick={this.validateBet}>Continue</Button>
            </div>
            else {
              return <div className="container bck-marine white-text d-flex flex-column">
                        <p className="text-center">Your jackpot: {this.state.betTotal}€</p>
                        <img src={this.state.image} alt="card"></img>

                        <div>
                          {this.deckCard}
                        </div>

                        <div className="d-flex justify-content-around">
                          <Button onClickCard={this.props.onClickCard}>Card</Button>
                          <Button onClickPass={this.props.onClickPass}>Pass</Button>
                        </div>
                     </div>
            };
  };
};

export default Player;

