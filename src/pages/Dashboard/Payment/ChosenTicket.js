import { Container, TicketHolder } from "./styles/PaymentStyles";
import PaymentForm from "../../../components/Cards/CreditCardForm";
import { useState } from "react";

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
        {paid === false ? <PaymentForm setPaid={setPaid} /> : <div>Olá</div>}
      </Container>
    </>
  );
}
