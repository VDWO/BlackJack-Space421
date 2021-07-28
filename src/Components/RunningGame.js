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
      ["1D","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD"],
      ["1H","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH"],
      ["1S","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"],
      ["1C","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC"],
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
  }
  componentDidMount() {
    this.setRound()
  }

 // Fonction qui permet d'ajouter un carte à la main d'un joueur et arrêter le round s'il dépasse 21
  addPlayerCard = () => {
    this.setState(prevState => ({
      ...prevState,
      PlayerHand: [...prevState.PlayerHand,this.drawCard()]
    }))
    if (/* this.state.playerHand[Valeur] */ > 21) {
      //Diminuer la cagnotte du joueur -> round suivant
    }
  }

  // Fonction qui permet d'ajouter des carte au banquier et/ou de comparer le résultat du round
  passAndResult = () => {
    
    while (/* this.state.bankHand[Valeur] */ < 16) {
      this.setState(prevState => ({
        ...prevState,
        BankHand: [...prevState.BankHand,this.drawCard()] 
      }))
    }
    
    if (this.state.bankHand[Valeur] > 21) {
      //augmenter la cagnotte du joueur -> next round
    } 
    else if (/* this.state.bankHand[Valeur] */ >= /* this.state.playerHand[Valeur] */) {
       // Diminuer la cagnotte du joueur -> next round
    } else {
       // Augmenter la cagnotte du joueur -> next round
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
          onClick = {this.addPlayerCard}
        />
      </div>
    );
  }
}


export default RunningGame;
