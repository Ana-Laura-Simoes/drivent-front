import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import NoActivitiesMessage from "./NoActivitiesMessage";
import ActivitiesPage from "./ActivitiesPage";
import { toast } from "react-toastify";

export default function Activities() {
  const { payment } = useApi();
  const [paymentData, setPaymentData] = useState(false);
  const [choosenDay, setChoosenDay] = useState("2021-10-22");

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

  return <ActivitiesPage day={choosenDay} setChoosenDay={setChoosenDay} />;
}

