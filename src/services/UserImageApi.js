import api from "./api";

export default class UserImageApi {
  static setImage(body) {
    return api.post("/userImage", body);
  }

  static getImage(id) {
    return api.get(`/userImage/${id}`);
  }
}
