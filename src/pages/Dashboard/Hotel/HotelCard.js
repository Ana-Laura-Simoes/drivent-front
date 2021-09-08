import styled from "styled-components";

export default function HotelCard({ id, image, name, types, available, select, selected }) {
  return (
    <Wrapper isClicked={selected} onClick={() => select(id)}>
      <img src={image} alt="hotel"></img>
      <Name>{name}</Name>
      <Info>Tipos de acomodação:</Info>
      <Status>{types.map((t, index) => <span key={index}>{t}{index===types.length-2?" e ":index===types.length-1?".":","}</span>)} </Status>
      <Info>Vagas disponíveis:</Info>
      <Status>{available}</Status>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width:196px;
  height: 264px;
  padding:16px 14px;
  background: ${(props) => (props.isClicked ? "#FFEED2" : "#F1F1F1")};
  border-radius: 10px;
  display:flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  img{
    border-radius: 5px;
    width: 168px;
    height: 109px;
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
