import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import UnavailableMessage from "./UnavailableMessage";
import ViewCertificate from "./ViewCertificate";
import { toast } from "react-toastify";

export default function Certificate() {
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
      <UnavailableMessage
        message={
          "Você precisa ter confirmado pagamento antes de visualizar seus certificados."
        }
      />
    );
  }

 else{
   return(
   <ViewCertificate/>
   );
 }
}
