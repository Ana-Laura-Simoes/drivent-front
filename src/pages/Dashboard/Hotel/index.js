import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";

export default function Hotel() {
  const { hotel } = useApi();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    hotel
      .getHotels()
      .then(({ data }) => {
        console.log(data);
        if (data) setHotels(data);
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

  return (
    <Container>
      <Title>Ingresso e pagamento</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  `;

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;
