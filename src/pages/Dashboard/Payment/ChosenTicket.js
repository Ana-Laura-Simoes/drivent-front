import { Container, TicketHolder } from "./styles/PaymentStyles";
import PaymentForm from "../../../components/Cards/CreditCardForm";

export default function ChosenTicket() {
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

    </>
  );
}
