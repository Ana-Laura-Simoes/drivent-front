import { Wrapper, Message } from "../Styles/NotMessages";

export default function NoActivitiesMessage({ message }) {
  return (
    <Wrapper>
      <Message>
        <span>{message}</span>
      </Message>
    </Wrapper>
  );
}
