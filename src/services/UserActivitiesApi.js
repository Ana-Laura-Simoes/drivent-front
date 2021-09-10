import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class UserActivitiesApi extends AuthenticatedApi {
  registerUserActivity(body) {
    return api.post("/userActivities", body, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getUserActivities(id) {
    return api.get(`/userActivities/${id}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  deleteUserActivity(body) {
    return api.post("/userActivities/delete", body, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
