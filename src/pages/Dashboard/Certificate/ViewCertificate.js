import { useEffect, useState } from "react";
import useApi from "./../../../hooks/useApi";
import { toast } from "react-toastify";
import UnavailableMessage from "./UnavailableMessage";

export default function ViewCertificate() {
const [finishedEvent, setFinishedEvent] = useState(false);

if(!finishedEvent) {
    return (
     <UnavailableMessage
        message={
            "A emissão de certificado somente será liberada ao final do evento"
          }/>
    );
}
}
