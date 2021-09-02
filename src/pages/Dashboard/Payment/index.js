import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import styled from "styled-components";

export default function Payment() {
  const { enrollment } = useApi();
  const [enrollmentFilled, setEnrollmentFilled] = useState(false);
  const [ticketModality, setTicketModality] = useState({
    ticket: "",
    price: 0,
    hotel: "",
  });

  useEffect(() => {
    enrollment.getPersonalInformations().then((response) => {
      if (response.data) setEnrollmentFilled(true);
    });
  }, []);
  if (!enrollmentFilled) {
    return (
      <Wrapper>
        <Title>Ingresso e pagamento</Title>
        <UnfilledEnrollment>
          <span>
            Você precisa completar sua inscrição antes de prosseguir pra escolha
            de ingresso
          </span>
        </UnfilledEnrollment>
      </Wrapper>
    );
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
      </ModalitiesContainer>

      {ticketModality.ticket === "Presencial" ? (
        <ModalitiesContainer>
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

          {ticketModality.hotel !== "" ? (
            <span>
              Fechado! O total ficou em R$ {ticketModality.price}. Agora é só
              confirmar:
            </span>
          ) : (
            "aaaa"
          )}
        </ModalitiesContainer>
      ) : (
        ""
      )}
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UnfilledEnrollment = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
    text-align: center;
  }
`;

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
  border: 1px solid #cecece;
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isClicked ? "#FFEED2" : "none")};
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
