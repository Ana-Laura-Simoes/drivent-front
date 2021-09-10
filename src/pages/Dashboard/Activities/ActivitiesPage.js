import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { BsBoxArrowInRight } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import ShowActivitiesByDay from "./ShowActivitiesByDay";
import UserContext from "../../../contexts/UserContext";

export default function ActivitiesPage({ day, setChoosenDay }) {
  const { activity, location, userActivities } = useApi();
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userActivitiesArray, setUserActivitiesArray] = useState([]);
  const id = useContext(UserContext).userData.user.id;

  function findUserActivities(e) {
    for (let i = 0; i < userActivitiesArray.length; i++) {
      if (e.id === userActivitiesArray[i].activityId) return true;
    }
    return false;
  }

  function updateUserActivities() {
    userActivities
      .getUserActivities(id)
      .then(({ data }) => {
        setUserActivitiesArray(data);
      })
      .catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Ocorreu um erro. Por favor, tente novamente");
        }
      });
  }

  useEffect(() => {
    location
      .getLocations()
      .then(({ data }) => {
        setLocations(data);
      })
      .catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível carregar os locais");
        }
      });

    activity
      .getActivitiesByDay(day)
      .then(({ data }) => {
        setActivities(data);
      })
      .catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível carregar as atividades");
        }
      });

    updateUserActivities();
  }, [day]);

  locations.forEach((l) => {
    let locationActivities = [];
    activities.forEach((a) => {
      if (a.locationId === l.id) locationActivities.push(a);
    });
    l.activities = locationActivities;
  });

  return (
    <>
      <Title>Escolha a sua atividade</Title>
      <ShowActivitiesByDay day={day} setChoosenDay={setChoosenDay} />
      <Container>
        {locations.map((l) => (
          <Location key={l.name}>
            <span className="title">{l.name}</span>
            <div className="container">
              {l.activities.map((a, index) => (
                <ActivityBox
                  checkBackground={findUserActivities(a)}
                  key={index}
                  hours={(dayjs(a.endTime) - dayjs(a.beginTime)) / 3600000}
                >
                  <div className="info">
                    <span>
                      {a.name}: {a.description}
                    </span>
                    <span className="time">
                      {dayjs(a.beginTime).format("HH:mm")} -{" "}
                      {dayjs(a.endTime).format("HH:mm")}
                    </span>
                  </div>

                  <Register>
                    {findUserActivities(a) ? (
                      <>
                        <FaRegCheckCircle className="registerOption" />
                        <h2>Inscrito</h2>
                      </>
                    ) : a.maxInscriptions - a.inscriptions > 0 ? (
                      <>
                        <BsBoxArrowInRight
                          onClick={() =>
                            userActivities
                              .registerUserActivity({ id, activity: a })
                              .then(updateUserActivities)
                              .catch(() => {
                                toast(
                                  "Você já está inscrito numa atividade neste horário."
                                );
                              })
                          }
                          className="registerOption"
                        />
                        <h2>{a.maxInscriptions - a.inscriptions} vagas</h2>
                      </>
                    ) : (
                      <>
                        <IoIosCloseCircleOutline className="fullOcupations" />
                        Esgotado
                      </>
                    )}
                  </Register>
                </ActivityBox>
              ))}
            </div>
          </Location>
        ))}
      </Container>
    </>
  );
}

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  margin-top: 71px;
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 100%;

  .title {
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    color: #7b7b7b;
    margin-bottom: 13px;
  }

  .container {
    border: 1px solid #d7d7d7;
    border-radius: 2px;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
`;

const ActivityBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${(props) => `${80 * props.hours}px`};
  background-color: ${(props) =>
    props.checkBackground ? "#D0FFDB" : "#F1F1F1"};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;

  .info {
    display: flex;
    flex-direction: column;
    span {
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;
      color: #343434;
      margin-bottom: 5px;
    }
    .time {
      font-weight: normal;
    }
  }
`;

const Register = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-left: 1px solid #cfcfcf;
  color: #cc6666;
  font-size: 9px;

  svg {
    font-size: 25px;
  }

  h2 {
    color: #078632;
  }

  .registerOption {
    color: #078632;
  }

  .fullOcupations {
    color: #cc6666;
  }
`;
