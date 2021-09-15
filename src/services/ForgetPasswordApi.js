import api from "./api";

export default class ForgetPasswordApi {
  getRecoveryPassword(body) {
    return api.post("/forgetpassword", body);
  }
}
