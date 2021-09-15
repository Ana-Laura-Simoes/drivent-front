import api from "./api";

export default class ForgetPasswordApi {
  getPasswordRecovery() {
    return api.post("/forgetpassword");
  }
}
