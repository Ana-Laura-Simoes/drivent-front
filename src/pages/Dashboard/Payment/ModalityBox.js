import styled from "styled-components";

export default function ModalityBox(props) {
  const { type, price, setTicketModality, hotel, label, selection } = props;
  return (
    <Wrapper
      isClicked={selection}
      onClick={() => {
        setTicketModality({
          ticket: type,
          hotel: hotel,
        });
      }}
    >
      <span className="type">{label}</span>
      <span className="price">R$ {price}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
