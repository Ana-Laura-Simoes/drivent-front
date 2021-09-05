import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";
import HotelCard from "./HotelCard";
import RoomCard from "./RoomCard";

export default function Hotel() {
  const { hotel } = useApi();
  const [hotels, setHotels] = useState([]);
  const [currentHotel, setCurrentHotel] = useState("none");

  useEffect(() => {
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

  console.log("hotels", hotels);

  function hotelSelection(current) {
    hotels.forEach((h, index) => index===current?h.selected=true:h.selected=false);
    setCurrentHotel(current);
    console.log(current);
  }

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
            {hotels[currentHotel].rooms.map(r => <RoomCard key={r.id} number={r.number} max={r.maxCapacity} available={r.available}/>)}
          </RoomsSection>
        </>:
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
