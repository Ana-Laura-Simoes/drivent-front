import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import styled from "styled-components";
import UnfilledEnrollment from "./TicketComponents.js/UnfilledEnrollment";

export default function Payment() {
  const { enrollment } = useApi();
  const [enrollmentFilled, setEnrollmentFilled] = useState(false);
  const [ticketModality, setTicketModality] = useState({
    ticket: "",
    price: 0,
    hotel: "",
  });
  const prices = { presencial: 250, online: 100, hotel: 350 };

  useEffect(() => {
    enrollment.getPersonalInformations().then((response) => {
      if (response.data) setEnrollmentFilled(true);
    });
  }, []);
  if (!enrollmentFilled) {
    return <UnfilledEnrollment />;
  }
  return (
    <>
      <Container>
        <Title>Ingresso e pagamento</Title>
      </Container>

      <ModalitiesContainer>
        <span>Primeiro, escolha sua modalidade de ingresso </span>

        <div className="modalities">
          <ModalitiesBox
            isClicked={ticketModality.ticket === "Presencial"}
            onClick={() => {
              setTicketModality({
                ticket: "Presencial",
                price: 250,
                hotel: "",
              });
            }}
          >
            <span className="type">Presencial</span>
            <span className="price">R$ 250</span>
          </ModalitiesBox>

          <ModalitiesBox
            isClicked={ticketModality.ticket === "Online"}
            onClick={() => {
              setTicketModality({
                ticket: "Online",
                price: 100,
                hotel: false,
              });
            }}
          >
            <span className="type">Online</span>
            <span className="price">R$ 100</span>
          </ModalitiesBox>
        </div>

        {ticketModality.ticket === "Presencial" ? (
          <>
            <span>Ótimo! Agora escolha sua modalidade de hospedagem </span>

            <div className="modalities">
              <ModalitiesBox
                isClicked={ticketModality.hotel === false}
                onClick={() => {
                  setTicketModality({
                    ticket: "Presencial",
                    price: 250,
                    hotel: false,
                  });
                }}
              >
                <span className="type">Sem Hotel</span>
                <span className="price">+ R$ 0</span>
              </ModalitiesBox>

              <ModalitiesBox
                isClicked={ticketModality.hotel === true}
                onClick={() => {
                  setTicketModality({
                    ticket: "Presencial",
                    price: 600,
                    hotel: true,
                  });
                }}
              >
                <span className="type">Com Hotel</span>
                <span className="price">+ R$ 350</span>
              </ModalitiesBox>
            </div>
          </>
        ) : (
          ""
        )}

        {ticketModality.hotel !== "" ? (
          <>
            <BookTicket>
              <span>
                Fechado! O total ficou em
                <strong> R$ {ticketModality.price}.</strong> Agora é só
                confirmar:
              </span>

              <button>RESERVAR INGRESSO</button>
            </BookTicket>
          </>
        ) : (
          ""
        )}
      </ModalitiesContainer>
    </>
  );
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

const ModalitiesBox = styled.div`
  margin-right: 24px;
  width: 145px;
  height: 145px;
  border: ${(props) => (props.isClicked ? "none" : "1px solid #cecece ")};
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isClicked ? "#FFEED2" : "none")};
  cursor: pointer;
  .type {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
  }
  .price {
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
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
