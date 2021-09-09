import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import useApi from "./../../../hooks/useApi";
import NoActivitiesMessage from "./NoActivitiesMessage";
import { toast } from "react-toastify";

export default function Activities() {
  const { payment } = useApi();
  const [paymentData, setPaymentData] = useState(false);

  useEffect(() => {
    payment
      .getPayment()
      .then(({ data }) => {
        data.length || setPaymentData(data);
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

  return <Title>Ingresso e pagamento</Title>;
}

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;
