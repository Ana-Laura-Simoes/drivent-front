import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import NotPaidMessage from "./NotPaidMessage";
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
        /* eslint-disable-next-line no-console */
        console.log(error);
      });
  }, []);

  if (!paymentData) {
    return <NotPaidMessage />;
  }

  return <Title>Ingresso e pagamento</Title>;
}

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;
