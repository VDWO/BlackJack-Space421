import React from "react";

const source = "https://deckofcardsapi.com/static/img";

class Card extends React.Component {
    constructor() {
        super();

        this.state = {
            image: ["./img/item.png"],
        };
    };

    // Requête API
    componentDidMount() {
        fetch(`${source}/${this.props.img}.png`)
        .then(res => res.blob())
        .then(img => {
        const cardImage = URL.createObjectURL(img);
        console.log(cardImage)

        this.setState(prevState => ({
            ...prevState,
            image: cardImage
        }));
        });
    };

    render() {
        return (
            <div>
                <img src={this.state.image} alt="card" style={{ width: "180px"}}></img>
            </div>
        )};
};

export default Card;