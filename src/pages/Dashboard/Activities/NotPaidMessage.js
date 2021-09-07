import { Wrapper, Message } from "../Styles/NotMessages";

export default function NotPaidMessage() {
  return (
    <Wrapper>
      <Message>
        <span>
          Você precisa ter confirmado pagamento antes de fazer a escolha de
          atividades.
        </span>
      </Message>
    </Wrapper>
  );
}
