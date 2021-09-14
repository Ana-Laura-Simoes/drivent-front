import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import NotMessages from "../Styles/NotMessages";
import ViewCertificate from "./ViewCertificate";
import { toast } from "react-toastify";
import Loading from "../Styles/Loading";

export default function Certificate() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { payment } = useApi();
  const [paymentData, setPaymentData] = useState(false);

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
