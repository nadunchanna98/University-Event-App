import { Platform } from "react-native";

let BASE_URL = "";

// if (Platform.OS === "android") {
//     BASE_URL = "https://e-week-app-backend-2.onrender.com/api/v1/" // for android emulator
// } else {
//     BASE_URL = "https://e-week-app-backend-2.onrender.com/api/v1/" // for ios emulator
// }   


if (Platform.OS === "android") {
    BASE_URL = "http://192.168.8.129:3000/api/v1/" // for android emulator
} else {
    BASE_URL = "http://192.168.8.129:3000/api/v1/" // for ios emulator
}

// if (Platform.OS === "android") {
//     BASE_URL = "http://10.102.11.72:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://10.102.11.72:3000/api/v1/" // for ios emulator
// }


export default BASE_URL;