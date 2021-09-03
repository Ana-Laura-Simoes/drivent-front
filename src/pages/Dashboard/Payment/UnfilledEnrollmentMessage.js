import styled from "styled-components";

export default function UnfilledEnrollmentMessage() {
  return (
    <Wrapper>
      <h1>Ingresso e pagamento</h1>
      <UnfilledEnrollment>
        <span>
          Você precisa completar sua inscrição antes de prosseguir pra escolha
          de ingresso
        </span>
      </UnfilledEnrollment>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1{
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }
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

