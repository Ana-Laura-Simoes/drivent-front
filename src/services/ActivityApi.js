import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";
export default class ActivityApi extends AuthenticatedApi {
  getActivitiesByDay(day) {
    return api.get(`/activities/:${day}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getDays() {
    return api.get("/activities/days", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
