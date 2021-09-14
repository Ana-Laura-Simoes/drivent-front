import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import NotMessages from "../Styles/NotMessages";
import ActivitiesPage from "./ActivitiesPage";
import Loading from "../Styles/Loading";
import { toast } from "react-toastify";

export default function Activities() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { payment } = useApi();
  const [paymentData, setPaymentData] = useState(false);
  const [choosenDay, setChoosenDay] = useState("2021-10-22");

  useEffect(() => {
    setLoading(true);
    setLoadingMessage("Carregando");
    payment
      .getPayment()
      .then(({ data }) => {
        data.length || setPaymentData(data);
        setLoading(false);
      })
      .catch((error) => {
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

  if(loading) {
    return( 
    <Loading loadingMessage={loadingMessage}/>
    );
  }

  if (!paymentData) {
    return (
      <NotMessages
        message={
          "Você precisa ter confirmado pagamento antes de fazer a escolha de atividades."
        }
      />
    );
  }

  if (paymentData.type === "Online") {
    return (
      <NotMessages
        message={
          "Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."
        }
      />
    );
  }

  return <ActivitiesPage day={choosenDay} setChoosenDay={setChoosenDay} />;
}

