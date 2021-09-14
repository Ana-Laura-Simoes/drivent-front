import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import NoActivitiesMessage from "./NoActivitiesMessage";
import ActivitiesPage from "./ActivitiesPage";
import { toast } from "react-toastify";
import styled from "styled-components";
import Loader from "react-loader-spinner";

export default function Activities() {
  const [loading, setLoading] = useState(false);
  const { payment } = useApi();
  const [paymentData, setPaymentData] = useState(false);
  const [choosenDay, setChoosenDay] = useState("2021-10-22");

  useEffect(() => {
    setLoading(true);
    payment
      .getPayment()
      .then(({ data }) => {
        data.length || setPaymentData(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
          toast(detail);
          }
        } else {
          toast("Não foi possível carregar");
        }
      });
  }, []);

  if(loading) {
    return( 
    <Grid>     
    <Loader
      type="Oval"
      color="#E0E0E0"
      height={100}
      width={100}
    />
    <span>Carregando</span>
    </Grid>
    );
  }

  if (!paymentData) {
    return (
      <NoActivitiesMessage
        message={
          "Você precisa ter confirmado pagamento antes de fazer a escolha de atividades."
        }
      />
    );
  }

  if (paymentData.type === "Online") {
    return (
      <NoActivitiesMessage
        message={
          "Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."
        }
      />
    );
  }

  return <ActivitiesPage day={choosenDay} setChoosenDay={setChoosenDay} />;
}

const Grid = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column ;
  align-items: center;
  justify-content: center;

  span{
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #7B7B7B;
  }
`;
