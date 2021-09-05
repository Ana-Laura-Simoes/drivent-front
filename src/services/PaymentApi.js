import api from "./api";

export default class PaymentApi {
  static createPayment(body) {
    return api.post("/payment", body);
  }

  getPayment(body) {
    return api.get("/payment", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
