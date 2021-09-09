import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import useApi from "./../../../hooks/useApi";
import NoActivitiesMessage from "./NoActivitiesMessage";
import { toast } from "react-toastify";

export default function ActivitiesPage() {
  const { payment } = useApi();
  const [paymentData, setPaymentData] = useState(false);

  /*useEffect(() => {
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
  */

  return (
   <>
  <Title>Ingresso e pagamento</Title>
   <Container>
       <Location>
           <span className="title">Auditório Principal</span>
           <div className="container"></div>
       </Location>
       <Location>
           <span className="title">Auditório Lateral</span>
           <div className="container"></div>
       </Location>
       <Location>
           <span className="title">Sala de Workshop</span>
           <div className="container"></div>
       </Location>
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
display:flex;
align-items:center;
justify-content: center;
width:100%;
height:80%;
margin-top:71px;
`;

const Location = styled.div`
display:flex;
flex-direction: column;
align-items: center;
width:40%;
height:100%;

.title{
font-size: 17px;
line-height: 20px;
text-align: center;
color: #7B7B7B;
margin-bottom: 13px;
}

.container{
border: 1px solid #D7D7D7;
border-radius: 2px;
width:100%;
height:100%;
}
`;

