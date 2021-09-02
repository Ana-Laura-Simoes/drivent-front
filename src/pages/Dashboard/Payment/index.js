import styled from "styled-components";
import ChosenTicket from "./ChosenTicket";

export default function Payment() {
  return (
    <>
      <Tittle>Ingresso e pagamento</Tittle>
      <ChosenTicket/>
    </>
  );
}

const Tittle = styled.h1`
  font-size: 34px;
  font-weight: 400;
`;
