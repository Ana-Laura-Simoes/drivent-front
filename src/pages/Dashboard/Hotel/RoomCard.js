import styled from "styled-components";
import { IoPersonSharp, IoPersonOutline } from "react-icons/io5";

export default function RoomCard({ id, number, max, available, selected, changeSelected }) {
  function renderPerson(quantity, ocupied, selected) {
    const render = [];
    for(let i = 0; i<quantity; i++) {
      if(ocupied) {
        render.push(<IoPersonSharp key={i} fontSize="20px" color="black"/>);
        ocupied--;
      } else if(selected) {
        render.push(<IoPersonSharp key={i} fontSize="20px" color="#FF4791"/>);
        selected=false;
      } else {
        render.push(<IoPersonOutline key={i} fontSize="20px" color="black"/>);
      }
    }
    return render.reverse();
  }

  function verifyIfNotFull() {
    available?changeSelected(id):console.log("this room is full");
  }

  return (
    <Wrapper full={!available} selected={selected} onClick={() => verifyIfNotFull()}>
      <span>{number}</span>
      <Occupants>
        {renderPerson(max, max-available, selected)}
      </Occupants>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  background-color: ${(props) => (props.full ? "grey" : props.selected? "#FFEED2" : "white")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  opacity: ${(props) => (props.full ? 0.5 : 1)};
`;

const Occupants = styled.div`
  display: flex;
  gap: 6px;
`;
