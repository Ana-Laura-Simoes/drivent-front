import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

import AuthLayout from "../../layouts/Auth";

import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "../../components/Link";
import { Row, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";
import UserContext from "../../contexts/UserContext";

import useApi from "../../hooks/useApi";

export default function NewPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const api = useApi();

  const { eventInfo } = useContext(EventInfoContext);
  const { userData } = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    api.forgetpassword.getRecoveryInfo(params.token).then((response) => {
      setEmail(response.data[0].email);
    }).catch((error) => {
      toast("Seu link de recuperação de senha expirou, tente novamente!");
      history.push("/sign-in");
    });
  }, []);

  function submit(event) {
    event.preventDefault();
    setLoadingSignIn(true);

    const body = { email, password, confirmPassword };

    if (password !== confirmPassword) {
      toast("As senhas não coincidem!");
      setPassword("");
      setConfirmPassword("");
    }

    api.forgetpassword
      .setNewPassword(body)
      .then((response) => {
        toast(
          "Sua senha foi alterada com sucesso!"
        );
        history.push("/sign-in");        
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);
        console.log(error.response);

        if (error.response.data.message) {
          toast(error.response.data.message);
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
        <Label>Digite aqui sua nova senha</Label>
        <form onSubmit={submit}>
          <Input
            label="Nova senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirmação da Senha"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
