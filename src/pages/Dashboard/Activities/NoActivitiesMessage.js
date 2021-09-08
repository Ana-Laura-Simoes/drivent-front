import { Wrapper, Message } from "../Styles/NotMessages";

export default function NotPaidMessage(message) {
  return (
    <Wrapper>
      <Message>
        <span>{message}</span>
      </Message>
    </Wrapper>
  );
}
