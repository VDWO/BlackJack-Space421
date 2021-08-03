import React from "react";
// Components
import Player from "./Player";
// CSS
import "./RunningGame.modules.css";

class RunningGame extends React.Component {
  constructor() {
    super();

    this.state = {
      bankHand: [],
      playerHand: [],
      playerCash: 100,
      bet: 0,
      isBet: "bet",
    };
  };

  componentDidUpdate() {
    console.log(this.state)
    this.handValue("bankHand")
    console.log("Bank hand", this.handValue("bankHand"))
    this.handValue("playerHand")
    console.log("Player hand", this.handValue("playerHand"))
  };

  componentDidMount() {
    this.setRound()
  };

  // Fonction random card
  drawCard = () => {
    const cardArray = [
      ["AD","2D","3D","4D","5D","6D","7D","8D","9D","0D","JD","QD","KD"],
      ["AH","2H","3H","4H","5H","6H","7H","8H","9H","0H","JH","QH","KH"],
      ["AS","2S","3S","4S","5S","6S","7S","8S","9S","0S","JS","QS","KS"],
      ["AC","2C","3C","4C","5C","6C","7C","8C","9C","0C","JC","QC","KC"],
    ];
    const cardNumber = (Math.floor(Math.random() * 13));
    const cardSuits = (Math.floor(Math.random() * 4));
    return cardArray[cardSuits][cardNumber]
  };

  // Lancement de la partie
  setRound = () => {
    if (this.state.playerCash === 0) {
      this.props.endGame("lost")
    } else if (this.state.playerCash >= 200) {
      this.props.endGame("win")
    } else {
      this.setState(prevState => ({
        ...prevState,
        playerHand: [this.drawCard(),this.drawCard()],
        bankHand: [this.drawCard(),this.drawCard()],
      }));
    };
  };

  // Valeur de la main 
  handValue = (param) => {
    let handValueCalulated = 0;

    this.state[`${param}`].map(card => {  
        if (card.substring(0, (card.length - 1)) === "A") {
          return handValueCalulated += 11
        } else if (isNaN(parseInt(card.substring(0, (card.length - 1))))) {
          return handValueCalulated += 10 
        } else if (card.substring(0, (card.length - 1)) === "0") {
        return handValueCalulated += 10 
        } else {
          return handValueCalulated += parseInt(card.substring(0, (card.length - 1)))
        };     
    });
    return handValueCalulated
  };

  // Fonction changement de view

  updateBetStatus = (e) => {
    if (e > this.state.playerCash) {
      return console.log("can't play, you don't have enough money!") 
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isBet: "play",
        bet: e,
      }));
    };

    if (this.handValue("playerHand") === 21) {
      this.setState((prevState) => ({
        ...prevState,
        isBet: "blackjack",
      }))
      console.log("black jack")
    }
  };

  updateBlackJackStatus = () => {
    this.setState((prevState) => ({
      ...prevState,
      playerCash: prevState.playerCash + (this.state.bet * 1.5),
      isBet: "bet",
    }));
    this.nextRound()
  };

  // Add card 

  addPlayerCard = () => {
    this.setState(prevState => ({
     ...prevState,
     playerHand: [...prevState.playerHand,this.drawCard()]
   }), () => {
     if (this.handValue("playerHand") > 21) {
       this.setState((prevState) => ({
       ...prevState,
       playerCash: prevState.playerCash - this.state.bet,
       isBet: "result"
       }));
     console.log("Player lose")
     };
    });
  };

  addbankCard = () => {
    this.setState(prevState => ({
      ...prevState,
      bankHand: [...prevState.bankHand,this.drawCard()] 
    }), () => {
      this.updateCashPlayer()
    });
  };

  // MaJ playerCash + check résultats
  updateCashPlayer = () => {

      if (this.handValue("bankHand") < 16) {
         this.addbankCard()
         return; // on arrêt updateCashPlayer 
      } 
      if (this.handValue("bankHand")  > 21) {
        this.setState((prevState) => ({
          ...prevState,
          playerCash: prevState.playerCash + this.state.bet,
          isBet: "result"
        }));
        console.log("Bank lose")
      } else if (this.handValue("bankHand") > this.handValue("playerHand")) {
        this.setState((prevState) => ({
          ...prevState,
          playerCash: prevState.playerCash - this.state.bet,
          isBet: "result"
        }));
        console.log("Bank win")
      } else if (this.handValue("bankHand") === this.handValue("playerHand")) {
        this.setState((prevState) => ({
          ...prevState,
          playerCash: prevState.playerCash,
          isBet: "result"
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          playerCash: prevState.playerCash + this.state.bet,
          isBet: "result"
        }));
        console.log("Player win")
      }
  };

  // Fonction qui lance le prochain round
  nextRound = () => {
    this.setRound()
    this.setState(prevState => ({
      ...prevState,
      isBet: "bet",
      playerCash: prevState.playerCash
    }));
  };

  render() {
    return (
        <div >
            <div className="container white-text d-flex flex-column mt">
              <p>timer: {this.props.timer} seconds</p>
              <p className="white-text">your cash: {this.state.playerCash}€</p>
            </div>
            
            <Player
            // bank props
            bankHand = {this.state.bankHand}
            bankHandValue = {this.handValue("bankHand")}
            onClickBank = {this.addbankCard}

            // player props
            playerHand = {this.state.playerHand}
            playerCash = {this.state.playerCash}
            playerHandValue = {this.handValue("playerHand")}
            updateBet = {this.updateBetStatus} 
            onClickPlay = {this.addPlayerCard}
            updateCash = {this.updateCashPlayer}

            // bet props
            bet = {this.state.bet}
            isBetState = {this.state.isBet}
  
            // other props
            nextRound = {this.nextRound}
            handValue = {this.handValue}
            blackJack = {this.updateBlackJackStatus}
            />
        </div>
    );
  };
};

export default RunningGame;