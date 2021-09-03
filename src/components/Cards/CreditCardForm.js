import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import UserContext from "../../contexts/UserContext";
import PaymentApi from "../../services/PaymentApi";

export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    userId: "",
    userEmail: "",
  };

  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    this.setState({ userId: user.userData.user.id });
    this.setState({ userEmail: user.userData.user.email });
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  sendClient = (e) => {
    e.preventDefault();

    const body = {
      userName: this.state.name,
      userId: this.state.userId,
      userEmail: this.state.userEmail,
      price: 500,
      type: "Online",
    };
    
    if (
      this.state.number.length === 16 &&
      this.state.name !== "" &&
      this.state.expiry.length === 4 &&
      this.state.cvc.length === 3
    ) {
      return PaymentApi.createPayment(body)
        .then(() => alert("Foi"))
        .catch(() => alert("Não foi"));
    }
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
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  maxLength="16"
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
                    type="number"
                    name="expiry"
                    placeholder="Valid Thru (MM/YY)"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="4"
                  />
                  <input
                    className="short"
                    type="number"
                    name="cvc"
                    placeholder="CVC"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    maxLength="3"
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
