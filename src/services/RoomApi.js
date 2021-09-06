import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class RoomApi extends AuthenticatedApi {
  bookRoom(body) {
    return api.post("/rooms", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
