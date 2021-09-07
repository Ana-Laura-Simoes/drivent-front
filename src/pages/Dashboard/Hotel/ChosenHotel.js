import { useEffect } from "react";
import styled from "styled-components";
import useApi from "./../../../hooks/useApi";
import { useState } from "react";

export default function ChosenHotel({ roomId, relocate, hotels }) {
  const { room } = useApi();
  const [currentRoom, setCurrentRoom] = useState();

  useEffect(() => {
    room.getRoom(roomId).then(({ data }) => {
      const userRoom = data;
      hotels.forEach(h => {
        if(h.id===data.hotelId) {
          userRoom.hotel = h.name;
        }
      });
      setCurrentRoom(userRoom);
    }).catch(err => 
      /* eslint-disable-next-line no-console */
      console.log(err)
    );
  }, []);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <SubTitle>Você já escolheu seu quarto:</SubTitle>
      <Wrapper>
        <img src={"https://upload.wikimedia.org/wikipedia/commons/7/79/Ponta_Negra_Beach_Hotel.jpg"}></img>
        {currentRoom?
          <>
            <Name>{currentRoom.hotel}</Name>
            <Info>Quarto reservado</Info>
            <Status>{currentRoom.type}</Status>
            <Info>Pessoas no seu quarto:</Info>
            {currentRoom.available===currentRoom.maxCapacity-1?
              <Status>Apenas você</Status>:
              <Status>Você e mais {currentRoom.maxCapacity-currentRoom.available-1} pessoas</Status>
            }
          </>:
          ""
        }

      </Wrapper>
      <Button onClick={() => relocate()}>RESERVAR QUARTO</Button>
    </>
  );
}

const Wrapper = styled.div`
  width:196px;
  height: 264px;
  padding:16px 14px;
  background-color: #FFEED2;
  border-radius: 10px;
  display:flex;
  flex-direction: column;
  gap: 10px;
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

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
  margin-bottom: 35px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom:20px;
`;

const Button = styled.button`
  margin-top: 17px;
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #000000;
`;
