import { useState } from "react";
import UnavaibleMessage from "../Styles/UnavailableMessage.js";

export default function ViewCertificate() {
const [finishedEvent, setFinishedEvent] = useState(false);

if(!finishedEvent) {
    return (
     <UnavaibleMessage
        message={
            "A emissão de certificado somente será liberada ao final do evento"
          }/>
    );
}
}
