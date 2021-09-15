import { useState, useContext } from "react";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import { Row, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";
import UserContext from "../../contexts/UserContext";

import useApi from "../../hooks/useApi";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  function submit(event) {
    event.preventDefault();
    setLoadingSignIn(true);

    api.auth
      .signIn(email, password)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);

        if (error.response) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível conectar ao servidor!");
        }
      })
      .then(() => {
        setLoadingSignIn(false);
      });
  }

  return (
    <AuthLayout background={eventInfo.backgroundImage}>
      <Row>
        <img src={eventInfo.logoImage} alt="Event Logo" />
        <Title>{eventInfo.eventTitle}</Title>
      </Row>
      <Row>
        <Label>Recuperar senha</Label>
        <form onSubmit={submit}>
          <Input
            label="E-mail"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            disabled={loadingSignIn}
          >
            Enviar
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Voltar para inscrição</Link>
        <Link to="/">Voltar para login</Link>
      </Row>
    </AuthLayout>
  );
}
