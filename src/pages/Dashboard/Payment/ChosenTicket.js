import { Container, TicketHolder } from "./styles/PaymentStyles";
import PaymentForm from "../../../components/Cards/CreditCardForm";
import { useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import useApi from "../../../hooks/useApi";

export default function ChosenTicket({ ticketModality }) {
  const [paid, setPaid] = useState(false);
  const { payment } = useApi();
  
  return (
    <>
      <Container>
        <h2>Ingresso escolhido</h2>
        <TicketHolder>
          {`${ticketModality.ticket} ${
            ticketModality.hotel && ticketModality.ticket === "Presencial" ? "+ Com Hotel" : ticketModality.ticket === "Presencial"  && ticketModality.hotel === false ? "+ Sem Hotel" : ""
          }`}
          <h2>{`R$ ${ticketModality.price}`}</h2>
        </TicketHolder>
      </Container>

      <Container>
        <h2>Pagamento</h2>
        {paid === false ? (
          <PaymentForm payment = {payment} setPaid={setPaid} ticketInformation = {ticketModality}/>
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
