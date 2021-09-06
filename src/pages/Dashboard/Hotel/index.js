import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";
import HotelCard from "./HotelCard";
import RoomCard from "./RoomCard";
import MissingSteps from "./MissingSteps";

export default function Hotel() {
  const { hotel, payment, room, user } = useApi();
  const [currentUser, setCurrentUser] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [currentHotel, setCurrentHotel] = useState("none");
  const [currentRoom, setCurrentRoom] = useState("none");

  console.log("user", currentUser);
  console.log("currentRoom", currentRoom);

  useEffect(() => {
    payment.getPayment().then(({ data }) => {
      data.length||setCurrentUser(data);
    }).catch(err => console.log(err));
    user.getUser().then(response => console.log(response));
    hotel
      .getHotels()
      .then(({ data: hotels }) => {
        const types = {};
        let totalAvailable = 0;
        hotels.forEach(h => {
          h.rooms.forEach(r => {
            if(!types[r.type]) types[r.type]=r.type;
            totalAvailable+=r.available;
          });
          h.totalAvailable = totalAvailable;
          h.types=Object.keys(types);
          h.selected=false;
        });
        setHotels(hotels);
      })
      .catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível carregar");
        }
        /* eslint-disable-next-line no-console */
        console.log(error);
      });
  }, []);

  function hotelSelection(current) {
    hotels.forEach((h, index) => index===current?h.selected=true:h.selected=false);
    setCurrentHotel(current);
    console.log(current);
  }

  function changeRoom(id) {
    hotels.forEach(h => {
      h.rooms.forEach(r => {
        if(r.id===id) {
          r.selected=true;
          setCurrentRoom(r);
        }else{
          r.selected=false;
        }
      });
    });
    setHotels([...hotels]);
  }

  function confirmReservation() {
    const body={ currentUser, currentRoom };
    room.bookRoom(body).then(response => {
      setAlreadyBooked(true);
    }).catch(error => {
      console.log(error);
    });
  }

  if(!currentUser) return <MissingSteps title="Escolha de hotel e quarto" message="Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem"/>;
  if(!currentUser.hotel) return <MissingSteps title="Escolha de hotel e quarto" message="Sua modalidade de ingresso não inclui hospedagem, prossiga para a escolha de atividades"/>;

  return (
    <Wrapper>
      <Title>Escolha de hotel e quarto</Title>
      <SubTitle>Primeiro, escolha um hotel</SubTitle>
      <CardsSection>
        {hotels.map((h, i) => <HotelCard key={h.id} id={i} name={h.name} image={"https://thumbs.dreamstime.com/z/hotel-de-luxo-488093.jpg"} types={h.types} available={h.totalAvailable} selected={h.selected} select={hotelSelection}/>)}
      </CardsSection>
      {currentHotel!=="none"?
        <>
          <SubTitle>Ótima pedida! Agora escolha seu quarto:</SubTitle>
          <RoomsSection>
            {hotels[currentHotel].rooms.map(r => <RoomCard key={r.id} id={r.id} number={r.number} max={r.maxCapacity} available={r.available} selected={r.selected} changeSelected={changeRoom}/>)}
          </RoomsSection>
        </>:
        ""
      }
      {currentRoom!=="none"?
        <Button onClick={() => confirmReservation()}>RESERVAR QUARTO</Button>:
        ""
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap:36px;
  flex-direction: column;
  `;

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom:-20px;
`;

const CardsSection = styled.div`
  height: 264px;
  display:flex;
  gap: 19px;
`;

const RoomsSection = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap:8px 17px;
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
