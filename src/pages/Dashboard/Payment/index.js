import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import styled from "styled-components";
import ModalityBox from "./ModalityBox";
import UnfilledEnrollmentMessage from "./UnfilledEnrollmentMessage";

export default function Payment() {
  const { enrollment } = useApi();
  const [enrollmentFilled, setEnrollmentFilled] = useState(false);
  const [payment, setPayment] = useState(false);
  const [ticketModality, setTicketModality] = useState({
    ticket: "",
    hotel: "",
  });

  const prices = { principal: 250, online: 100, hotel: 350 };

  function calculateTotal() {
    let total = 0;
    if (ticketModality.ticket === "Presencial" && ticketModality.hotel) {
      total = prices.principal + prices.hotel;
    } else if (ticketModality.ticket === "Presencial") {
      total = prices.principal;
    } else total = prices.online;

    return total;
  }

  useEffect(() => {
    enrollment.getPersonalInformations().then((response) => {
      if (response.data) setEnrollmentFilled(true);
    });
  }, []);

  if (!enrollmentFilled) {
    return <UnfilledEnrollmentMessage />;
  }
  if (!payment) {
    return (
      <>
        <Container>
          <Title>Ingresso e pagamento</Title>
        </Container>

        <ModalitiesContainer>
          <span>Primeiro, escolha sua modalidade de ingresso </span>

          <div className="modalities">
            <ModalityBox
              type={"Presencial"}
              label={"Presencial"}
              selection={ticketModality.ticket === "Presencial"}
              price={prices.principal}
              setTicketModality={setTicketModality}
              hotel={""}
            />
            <ModalityBox
              type={"Online"}
              label={"Online"}
              selection={ticketModality.ticket === "Online"}
              price={prices.online}
              setTicketModality={setTicketModality}
              hotel={false}
            />
          </div>

          {ticketModality.ticket === "Presencial" ? (
            <>
              <span>Ótimo! Agora escolha sua modalidade de hospedagem </span>

              <div className="modalities">
                <ModalityBox
                  type={"Presencial"}
                  label={"Sem Hotel"}
                  selection={ticketModality.hotel === false}
                  price={0}
                  setTicketModality={setTicketModality}
                  hotel={false}
                />
                <ModalityBox
                  type={"Presencial"}
                  label={"Com Hotel"}
                  selection={ticketModality.hotel === true}
                  price={prices.hotel}
                  setTicketModality={setTicketModality}
                  hotel={true}
                />
              </div>
            </>
          ) : (
            ""
          )}

          {ticketModality.hotel !== "" ? (
            <BookTicket>
              <span>
                Fechado! O total ficou em
                <strong> R$ {calculateTotal()}.</strong> Agora é só confirmar:
              </span>

              <button onClick={() => setPayment(true)}>
                RESERVAR INGRESSO
              </button>
            </BookTicket>
          ) : (
            ""
          )}
        </ModalitiesContainer>
      </>
    );
  }
  return "<Payment info={{ticket: ticketModality.ticket, hotel:ticketModality.hotel, price:calculatePrice()}} />";
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;

const ModalitiesContainer = styled.div`
  margin-top: 37px;
  span {
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
  .modalities {
    margin-top: 17px;
    margin-bottom: 43px;
    display: flex;
  }
`;

const BookTicket = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-top: 17px;
    width: 162px;
    height: 37px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #000000;
  }
`;
