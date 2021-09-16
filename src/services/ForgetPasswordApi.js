import api from "./api";

export default class ForgetPasswordApi {
  getRecoveryPassword(body) {
    return api.post("/forgetpassword", body);
  }

  setNewPassword(body) {
    return api.post("/forgetpassword/setnewpassword", body);
  }

  getRecoveryInfo(token) {
    return api.get(`/forgetpassword/${token}`);
  }
}
