import styled from "styled-components";

export default function RoomCard(props) {
  console.log("props", props);
  return (
    <Wrapper>
      {props.number}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  background-color: red;
  border-radius: 10px;
  cursor: pointer;
  img{
    border-radius: 5px;
  }
`;

const Name = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: #343434;
`;

const Info = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
`;

const Status = styled.div`
  margin-top: -8px;
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
`;
