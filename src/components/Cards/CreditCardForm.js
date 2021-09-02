import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  sendClient = (e) => {
    //const { name } = e.target;
    e.preventDefault();
    alert(this.state.name);
  };

  render() {
    return (
      <>
        <div className="PaymentForm">
          <form onSubmit={this.sendClient}>
            <div className="wrapper">
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
              <div className="inputWrapper">
                <input
                  className="long"
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <h2>E.g.: 49..., 51..., 36... 37...</h2>
                <input
                  className="long"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <div>
                  <input
                    className="medium"
                    type="text"
                    name="expiry"
                    placeholder="Valid Thru (MM/YY)"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="4"
                  />
                  <input
                    className="short"
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
            </div>
            <button type="submit">FINALIZAR PAGAMENTO</button>
          </form>
        </div>
      </>
    );
  }
}
