import { Container, TicketHolder } from "./styles/PaymentStyles";
import PaymentForm from "../../../components/Cards/CreditCardForm";
import { useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function ChosenTicket() {
  const [paid, setPaid] = useState(false);
  console.log(paid);
  return (
    <>
      <Container>
        <h2>Ingresso escolhido</h2>
        <TicketHolder>
          {/*aqui deve vir algum estado dizendo o tipo de ingresso escolhido*/}
          Presencial + Com Hotel
          {/*aqui deve vir algum estado com o preço*/} <h2>R$ 600,00</h2>
        </TicketHolder>
      </Container>

      <Container>
        <h2>Pagamento</h2>
        {paid === false ? (
          <PaymentForm setPaid={setPaid} />
        ) : (
          <div className="iconHolder">
            <IoCheckmarkCircleSharp />
            <div>
              <h1>Pagamento confirmado!</h1>
              <h2>Prossiga para escolha de hospedagem e atividades</h2>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
