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

  handleUpdateBet = (e) => {
    const param = e
    this.props.updateBet(param)
  }

  handleClick = () => {
    this.setState(prevState => ({
      ...prevState,
      isBet: true
    }));

  }

  render() {
    if (this.state.isBet === false)
      return <div className="container white-text d-flex flex-column ">
                <p className="text-center">Chose your bet:</p>
                <p className="text-center">{this.props.bet}€</p>
                <input type="range" min="0" max={this.props.playerCash} onChange={this.handleUpdateBet}></input>
                <Button onClick={this.handleClick}>Continue</Button>
            </div>
            else {
              return <div className="container bck-marine white-text d-flex flex-column">
                        <p className="text-center">Your jackpot: {this.state.betTotal}€</p>
                        <img src={this.state.image} alt="card"></img>

                        <div>
                          {this.deckCard}
                        </div>

                        <div className="d-flex justify-content-around">
                          <Button onClick={this.props.onClickPlay}>Card</Button>
                          <Button onClick={this.props.updateCash}>Pass</Button>
                        </div>
                     </div>
            };
  };
};

export default Player;

