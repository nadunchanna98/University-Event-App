import { Platform } from "react-native";

let BASE_URL = "";

if (Platform.OS === "android") {
    BASE_URL = "https://eventapp-step2.onrender.com/api/v1/" // for android emulator
} else {
    BASE_URL = "https://eventapp-step2.onrender.com/api/v1/" // for ios emulator
}   


// // my host
// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.81.74:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.43.74:3000/api/v1/" // for ios emulator
// }




export default BASE_URL;