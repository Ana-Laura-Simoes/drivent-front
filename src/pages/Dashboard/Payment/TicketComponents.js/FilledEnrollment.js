import { useState } from "react";
import styled from "styled-components";

export default function FilledEnrollment() {
  const [ticketModality, setTicketModality] = useState({
    ticket: "",
    price: 0,
    hotel: "",
  });
  const tickets = [
    { type: "Presencial", price: 250, hotel: "" },
    { type: "Online", price: 100, hotel: false },
  ];

  const hotels = [
    { type: "Sem Hotel", price: 0, hotel: false },
    { type: "Com Hotel", price: 350, hotel: true },
  ];
  return (
    <ModalitiesContainer>
      <span>Primeiro, escolha sua modalidade de ingresso </span>

      <div className="modalities">
        {tickets.map((t, index) => (
          <ModalitiesBox
            key={index}
            isClicked={ticketModality.ticket === t.type}
            onClick={() => {
              setTicketModality({
                ticket: t.type,
                price: t.price,
                hotel: t.hotel,
              });
            }}
          >
            <span className="type">{t.type}</span>
            <span className="price">R$ {t.price}</span>
          </ModalitiesBox>
        ))}
      </div>

      {ticketModality.ticket === "Presencial" ? (
        <>
          <span>Ótimo! Agora escolha sua modalidade de hospedagem </span>

          <div className="modalities">
            {hotels.map((h, index) => (
              <ModalitiesBox
                key={index}
                isClicked={ticketModality.hotel === h.hotel}
                onClick={() => {
                  setTicketModality({
                    ticket: "Presencial",
                    price: 250 + h.price,
                    hotel: h.hotel,
                  });
                }}
              >
                <span className="type">{h.type}</span>
                <span className="price">+ R$ {h.price}</span>
              </ModalitiesBox>
            ))}
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
              <strong> R$ {ticketModality.price}.</strong> Agora é só confirmar:
            </span>

            <button>RESERVAR INGRESSO</button>
          </BookTicket>
        </>
      ) : (
        ""
      )}
    </ModalitiesContainer>
  );
}

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
