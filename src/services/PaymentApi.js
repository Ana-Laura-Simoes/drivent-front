import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class PaymentApi extends AuthenticatedApi {
  static createPayment(body) {
    return api.post("/payment", body);
  }

  getPayment() {
    return api.get("/payment", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
