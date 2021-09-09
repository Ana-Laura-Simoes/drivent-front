import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";
export default class LocationApi extends AuthenticatedApi {
  getLocations(day) {
    return api.get("/locations", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
