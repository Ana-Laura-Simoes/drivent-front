import api from "./api";

export default class HotelApi {
  getHotels() {
    return api.get("/hotels");
  }
}
