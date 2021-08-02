import React from "react";

class Rules extends React.Component {
  render() {
    return (
      <div className="text-center" style={{ color: "white" }}>
        <h2>Rules :</h2>
        <p className="mt-3">The goal of blackjack is to beat the dealer's hand without going over 21</p>
        <p className="mt-3">Face cards are worth 10. Aces are worth 11</p>
        <p className="mt-3">Each player starts with two cards, one of the dealer's cards is hidden until the end</p>
        <p className="mt-3">To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn</p>
        <p className="mt-3">If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.</p>
        <p className="mt-3">If you are dealt 21 from the start (Ace & 10), you got a blackjack</p>
        <p className="mt-3">Dealer will hit until his/her cards total 17 or higher</p>
      </div>
    );
  }
}

export default Rules;
