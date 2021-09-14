import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";
import HotelCard from "./HotelCard";
import RoomCard from "./RoomCard";
import MissingSteps from "./MissingSteps";
import ChosenHotel from "./ChosenHotel";
import Loading from "../Styles/Loading";

export default function Hotel() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { hotel, payment, room } = useApi();
  const [currentUser, setCurrentUser] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [currentHotel, setCurrentHotel] = useState("none");
  const [currentRoom, setCurrentRoom] = useState("none");
  
  useEffect(() => {
    setLoading(true);
    setLoadingMessage("Carregando");
    payment.getPayment().then(({ data }) => {
      data.length||setCurrentUser(data);
      data.roomId&&setAlreadyBooked(true);
    }).catch(error => {
      if (error.response?.data?.details) {
        setLoadingMessage("Não foi possível carregar a página");
        for (const detail of error.response.data.details) {
          toast(detail);
        }
      } else {
        toast("Não foi possível carregar");
      }
    });
    hotel
      .getHotels()
      .then(({ data: hotels }) => {
        setLoading(false);
        hotels.forEach(h => {
          const types = {};
          let totalAvailable = 0;
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
      .catch(error => {
        setLoadingMessage("Não foi possível carregar a página");
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível carregar");
        }
      });
  }, []);

  function hotelSelection(current) {
    hotels.forEach((h, index) => index===current?h.selected=true:h.selected=false);
    setCurrentHotel(current);
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
      const chosenRoom = currentUser;
      chosenRoom.roomId=currentRoom.id;
      setCurrentUser(chosenRoom);
      setAlreadyBooked(true);
    }).catch(error => {
      if (error.response?.data?.details) {
        for (const detail of error.response.data.details) {
          toast(detail);
        }
      } else {
        toast("Não foi possível reservar o quarto");
      }
    });
  }

  function relocate() {
    hotel
      .getHotels()
      .then(({ data: hotels }) => {
        hotels.forEach(h => {
          const types = {};
          let totalAvailable = 0;
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
      .catch(error => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível carregar");
        }
      });
    setAlreadyBooked(false);
  }

  if(loading) { return( <Loading loadingMessage={loadingMessage}/>);
  }
  if(!currentUser) return <MissingSteps title="Escolha de hotel e quarto" message="Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem"/>;
  if(!currentUser.hotel) return <MissingSteps title="Escolha de hotel e quarto" message="Sua modalidade de ingresso não inclui hospedagem, prossiga para a escolha de atividades"/>;

  if(alreadyBooked) {
    return <ChosenHotel roomId={currentUser.roomId} relocate={relocate} hotels={hotels}/>;
  }
  return (
    <Wrapper>
      <Title>Escolha de hotel e quarto</Title>
      <SubTitle>Primeiro, escolha um hotel</SubTitle>
      <CardsSection>
        {hotels.map((h, i) => <HotelCard key={h.id} id={i} name={h.name} image={h.image} types={h.types} available={h.totalAvailable} selected={h.selected} select={hotelSelection}/>)}
      </CardsSection>
      {currentHotel!=="none"?
        <>
          {hotels[currentHotel].rooms.length?<SubTitle>Ótima pedida! Agora escolha seu quarto:</SubTitle>:""}
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
