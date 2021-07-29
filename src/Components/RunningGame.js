import React from "react";
import Player from "./Player";

class RunningGame extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
      bankHand: [],
      playerHand: [],
      playerCash: 100,
      bet: 0
    };
  }

  // cardImage undefined, trouver le problème
  /* deckCard = (cardValue) => {
    cardValue = "6D";
    fetch(`https://deckofcardsapi.com/static/img/${cardValue}.png`)
      .then((res) => res.blob())
      .then((result) => {
        const cardImage = URL.createObjectURL(result);
      });
    this.setState((prevState) => ({
      ...prevState,
      image: cardImage,
    }));
  }; */

  // Fonction qui permet de piocher une carte
  drawCard = () => {
    const cardArray = [
      ["AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD"],
      ["AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH"],
      ["AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"],
      ["AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC"],
    ];
    const cardNumber = (Math.floor(Math.random() * 13));
    const cardSuits = (Math.floor(Math.random() * 4));
    return cardArray[cardSuits][cardNumber]
  };

  // Fonction qui permet de distribuer 2 cartes a chaque joueur (et Banque)
  setRound = () => {
    this.setState(prevState => ({
      ...prevState,
      playerHand: [this.drawCard(),this.drawCard()],
      bankHand: [this.drawCard(),this.drawCard()]
    }))
  }

  componentDidUpdate() {
    console.log(this.state)
    this.handValue("bankHand")
    this.handValue("playerHand")
  }
  componentDidMount() {
    this.setRound()
  }

  // Fonction qui somme les cartes en main du joueur ou de la bank
  handValue = (param) => {
    let handValue = 0

    this.state[`${param}`].map(card => {  
        if (card.substring(0, (card.length - 1)) === "A") {
          return handValue += 11
        } else if (isNaN(parseInt(card.substring(0, (card.length - 1))))) {
          return handValue += 10        
        } else {
          return handValue += parseInt(card.substring(0, (card.length - 1)))
        }       
    })
    console.log(handValue)
  }

  // View bet => lors ce que le joueur selectionne sa mise
  updateBetPlayer = (e) => {
    this.setState((prevState) => ({
        ...prevState,
        bet: parseInt(e.target.value),
    }));
  };

  // Fonction qui permet d'ajouter un carte à la main d'un joueur et arrêter le round s'il dépasse 21
  addPlayerCard = () => {
    this.setState(prevState => ({
      ...prevState,
      playerHand: [...prevState.playerHand,this.drawCard()]
    }))
    if (this.handValue("playerHand") > 21) {
      this.setState((prevState) => ({
      ...prevState,
      playerCash: prevState.playerCash - this.state.bet
      }));
    }
  }
  // Fonction qui permet d'ajouter des carte au banquier et/ou de comparer le résultat du round
  updateCashPlayer = () => {
    
    while (this.handValue("bankHand") < 16) {
      this.setState(prevState => ({
        ...prevState,
        BankHand: [...prevState.BankHand,this.drawCard()] 
      }))
    }
    
    if (this.handValue("bankHand")  > 21) {
      this.setState((prevState) => ({
        ...prevState,
        playerCash: prevState.playerCash + this.state.bet
      }));
      console.log("BankLose")
    } 
    else if (this.handValue("bankHand") >= this.handValue("playerHand") ) { // CHECK POUR L'EGALITE !!!!
      this.setState((prevState) => ({
        ...prevState,
        playerCash: prevState.playerCash - this.state.bet
      }));
       console.log("Bank win")
    } else {
      this.setState((prevState) => ({
        ...prevState,
        playerCash: prevState.playerCash + this.state.bet
      }));
       console.log("Player win")
    }
  };

 /*  fonctionafficheCarte = () => { // fetche pour le visuel des cartes }; */

  render() {
    return (
      <div>
        <Player
          bankHand = {this.state.bankHand}
          playerHand = {this.state.playerHand}
          playerCash = {this.state.playerCash}
          bet = {this.state.bet}
          updateBet = {this.updateBetPlayer}
          updateCash = {this.updateCashPlayer}
          onClickPlay = {this.addPlayerCard}
        />
      </div>
    );
  }
}

export default RunningGame;