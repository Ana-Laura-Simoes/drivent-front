import styled from "styled-components";
import ChosenTicket from "./ChosenTicket";
import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import ModalityBox from "./ModalityBox";
import UnfilledEnrollmentMessage from "./UnfilledEnrollmentMessage";
import { toast } from "react-toastify";

export default function Payment() {
  const { enrollment, payment } = useApi();
  const [enrollmentFilled, setEnrollmentFilled] = useState(false);
  const [paymentData, setPaymentData] = useState(false);
  const [newPayment, setNewPayment] = useState(false);
  const [ticketModality, setTicketModality] = useState({
    ticket: "",
    hotel: "",
    price: 0,
  });

  const prices = { principal: 250, online: 100, hotel: 350 };

  useEffect(() => {
    enrollment
      .getPersonalInformations()
      .then((response) => {
        if (response.data) setEnrollmentFilled(true);
      })
      .catch(error => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível carregar a página");
        }
      });

    payment
      .getPayment()
      .then(({ data }) => {
        data.length || setPaymentData(data);
      })
      .catch((err) =>
      toast("Não foi possível carregar seus pagamentos anteriores")
      );
  }, []);

  if (paymentData) {
    return (
      <ChosenTicket
        ticketModality={{
          ticket: paymentData.type,
          price: paymentData.price,
          hotel: paymentData.hotel,
          paid: true,
        }}
      />
    );
  }

  if (!enrollmentFilled) {
    return <UnfilledEnrollmentMessage />;
  }

  if (!newPayment) {
    return (
      <>
        <Title>Ingresso e pagamento</Title>

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
                <strong> R$ {ticketModality.price}</strong> Agora é só
                confirmar:
              </span>

              <button onClick={() => setNewPayment(true)}>
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
  return <ChosenTicket ticketModality={{ ...ticketModality, paid: false }} />;
}

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
