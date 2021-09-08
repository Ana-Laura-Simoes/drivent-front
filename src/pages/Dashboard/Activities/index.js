import { useEffect, useState, useContext } from "react";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";
import DontNeedToChooseActivitiesMessage from "./DontNeedToChooseActivitiesMessage";

export default function Activities() {
  const { payment } = useApi();
  const [isAnOnlineTicket, setIsAnOnlineTicket] = useState(false);

  useEffect(() => {
    payment
      .getPayment()
      .then((response) => {
        console.log(response.data);
        if (response.data.type === "Online") setIsAnOnlineTicket(true);
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

  if (isAnOnlineTicket) {
    return <DontNeedToChooseActivitiesMessage />;
  } else {
    return "Atividades: Em breve!";
  }
}
