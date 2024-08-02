import { io } from "socket.io-client";
import { REACT_APP_BACKEND_URL } from "../config";

const socket = io(`${REACT_APP_BACKEND_URL}`, {
    withCredentials: true
});

export default socket;





