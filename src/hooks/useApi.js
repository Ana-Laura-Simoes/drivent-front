import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import EnrollmentApi from "../services/EnrollmentApi";
import HotelApi from "../services/HotelApi";
import PaymentApi from "../services/PaymentApi";
import RoomApi from "../services/RoomApi";
import UserActivitiesApi from "../services/UserActivitiesApi";
import ActivityApi from "../services/ActivityApi";
import LocationApi from "../services/LocationApi";
import UserImageApi from "../services/UserImageApi";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cep: new CepApi(),
    enrollment: new EnrollmentApi(),
    hotel: new HotelApi(),
    payment: new PaymentApi(),
    room: new RoomApi(),
    userActivities: new UserActivitiesApi(),
    activity: new ActivityApi(),
    location: new LocationApi(),
    userImage: new UserImageApi(),
  };
}
