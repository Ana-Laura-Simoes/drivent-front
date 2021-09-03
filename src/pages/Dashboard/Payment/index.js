import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import styled from "styled-components";
import UnfilledEnrollment from "./TicketComponents.js/UnfilledEnrollment";
import FilledEnrollment from "./TicketComponents.js/FilledEnrollment";

export default function Payment() {
  const { enrollment } = useApi();
  const [enrollmentFilled, setEnrollmentFilled] = useState(false);

  useEffect(() => {
    enrollment.getPersonalInformations().then((response) => {
      if (response.data) setEnrollmentFilled(true);
    });
  }, []);

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      {enrollmentFilled ? <FilledEnrollment /> : <UnfilledEnrollment />}
    </>
  );
}

const Title = styled.div`
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;
