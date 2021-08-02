import React from "react";

class Result extends React.Component {

  render() {
    if (this.props.win === true) {
      return (
      <div className="text-center" style={{ color: "white" }}>
        <h1>YOU WIN !!!</h1>
        {/* Gif téléchargé ou importé d'une API */}
        <p>You managed to beat the bank ! Well done !</p>
      </div>
      )
    } else if (this.props.win === false) {
      return (
        <div className="text-center" style={{ color: "white" }}>
          <h1>YOU LOST...</h1>
          {/* Gif téléchargé ou importé d'une API */}
          <p>Unlucky ! You lost everything, you can try again and you might beat the bank this time.</p>
        </div>
      )
    }
    

  }
}

export default Result;
