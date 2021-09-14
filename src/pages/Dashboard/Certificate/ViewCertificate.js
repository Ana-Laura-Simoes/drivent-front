import { useState } from "react";
//import UnavailableMessage from "./UnavailableMessage";
import NotMessages from "../Styles/NotMessages";

export default function ViewCertificate() {
const [finishedEvent, setFinishedEvent] = useState(false);

if(!finishedEvent) {
    return (
     <NotMessages
        message={
            "A emissão de certificado somente será liberada ao final do evento"
          }/>
    );
}
}
