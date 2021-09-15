import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

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

  sendClient = () => {
    const body = {
      userName: this.state.name,
      userId: this.state.userId,
      userEmail: this.state.userEmail,
      price: this.props.ticketInformation.price,
      type: this.props.ticketInformation.ticket,
      hotel: this.props.ticketInformation.hotel,
      roomId: null,
    };

    if (this.state.number.replace(/\s+/g, "").length !== 16) {
      return toast("O número do cartão precisa ter 16 dígitos.");
    }
    if (this.state.name.length < 4) {
      return toast("O nome precisa ter pelo menos 4 caracteres.");
    }
    if (
      this.state.expiry.replace("/", "").length !== 4 ||
      Number(this.state.expiry.replace("/", "").slice(0, 2)) > 12 ||
      Number(this.state.expiry.replace("/", "").slice(0, 2)) === 0
    ) {
      return toast("Insira uma data de expiração válida.");
    }
    if (this.state.cvc.length !== 3) {
      return toast("O CVC precisa ter 3 dígitos.");
    }

    return this.props.payment.save(body)
      .then(() => {
        toast("Pagamento realizado com sucesso");
        this.props.setPaid(true);
      })
      .catch(() => toast("Ocorreu um erro. Por favor, tente novamente!"));
  };

  render() {
    return (
      <>
        <div className="PaymentForm">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.sendClient();
            }}
          >
            <div className="wrapper">
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
              <div className="inputWrapper">
                <InputMask
                  mask="9999 9999 9999 9999"
                  className="long"
                  type="text"
                  name="number"
                  placeholder="Card Number"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <h2>E.g.: 49..., 51..., 36... 37...</h2>
                <InputMask
                  className="long"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <div>
                  <InputMask
                    mask="99/99"
                    className="medium"
                    type="text"
                    name="expiry"
                    placeholder="Valid Thru (MM/YY)"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                  <InputMask
                    mask="999"
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
