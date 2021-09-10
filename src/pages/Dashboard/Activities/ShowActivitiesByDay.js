import styled from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";

export default function ShowActivitiesByDay({ choosenDay, setChoosenDay }) {
  const [activitiesDays, setActivitiesDays] = useState([]);
  const { activity } = useApi();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    activity
      .getDays()
      .then(({ data }) => {
        setActivitiesDays(data);
      })
      .catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível carregar as datas");
        }
      });
  }, []);

  function handleClick(i, a) {
    setSelected(i);
    let day;
    day = dayjs(a).format("YYYY-MM-DD");   
    setChoosenDay(day);
  }

  return (
    <Container>
      {activitiesDays.map((a, i) => (
        <Day
          key={i}
          selected={selected}
          i={i}
          name={a}
          onClick={() => handleClick(i, a)}
        >
          <div>
            {dayjs(a)
              .locale("pt")
              .format("dddd")
              .replace("-feira", "")}
            , {dayjs(a).format("DD/MM")}
          </div>
        </Day>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 0.2%;
  margin-top: 71px;
`;

const Day = styled.div`
  display: flex;
  border-radius: 4px;
  background-color: ${(props) =>
    props.selected === props.i ? "#FFD37D" : "#E0E0E0"};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  margin-right: 20px;
  justify-content: flex-start;
  cursor: pointer;

  div {
    margin: 0 auto;
    padding: 10px;
  }
`;
