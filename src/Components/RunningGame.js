import React from "react";
import Player from "./Player";

class RunningGame extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
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

  FonctionDistribution = () => {
    // Random conditionnel entre 1 à 13 + valeur de 1 à 4 (pour la lettre) Banque *2
    // Random conditionnel entre 1 à 13 joueur *2 +  en props les cartes pour pouvoir les afficher dans composant Player
    // ajouter une carte
  };

  fonctionafficheCarte = () => {
    // fetche pour le visuel des cartes
  };

  fonctionPass = () => {
    // comparaison des jeux entre le joueur et la banque condition qui met à jour la cagnotte
    // => fonctionJeu
  };

  fonctionCarte = () => {
    // Ici ajouter une carte au joueur et traiter s'il dépasse la valeur 21
  };

  fonctionCompare21 = () => {}; // ici on compare si le joueur ou la banque à passé 21 + on regarde si la banque est au dessus de 16

  fonctionCompareJoueur = () => {}; // ici on compare la banque et le joueur

  render() {
    return (
      <div>
        RunningGame /// un visuel banque
        <Player />
        {this.deckCard}
        <img src={this.state.image}></img>
      </div>
    );
  }
}

export default RunningGame;
