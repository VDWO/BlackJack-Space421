import React from "react";

class Button extends React.Component {
  render() {
    return (
      <div>
        <button
        type="button"
        className="btn btn-danger"
        onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </div>
    );
  };
};

export default Button;
