import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

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
