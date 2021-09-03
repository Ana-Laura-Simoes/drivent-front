import api from "./api";

export default class PaymentApi {
  static createPayment(body) {
    return api.post("/payment", body);
  }
}
