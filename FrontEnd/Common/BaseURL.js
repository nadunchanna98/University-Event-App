import { Platform } from "react-native";

let BASE_URL = "";

if (Platform.OS === "android") {
    BASE_URL = "https://eventapp-step2.onrender.com/api/v1/" // for android emulator
} else {
    BASE_URL = "https://eventapp-step2.onrender.com/api/v1/" // for ios emulator
}   


// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.8.129:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.8.129:3000/api/v1/" // for ios emulator
// }


// //myrouter
// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.8.129:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.8.129:3000/api/v1/" // for ios emulator
// }

// // my new router
// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.8.101:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.8.101:3000/api/v1/" // for ios emulator
// }


// // // inoj
// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.8.129:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.8.129:3000/api/v1/" // for ios emulator
// }



// //host my
// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.43.74:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.43.74:3000/api/v1/" // for ios emulator
// }

// //host my other phone
// if (Platform.OS === "android") {
//     BASE_URL = "http://192.168.43.3:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://192.168.43.3:3000/api/v1/" // for ios emulator
// }


// //edurome
// if (Platform.OS === "android") {
//     BASE_URL = "http://10.102.17.82:3000/api/v1/" // for android emulator
// } else {
//     BASE_URL = "http://10.102.17.82:3000/api/v1/" // for ios emulator
// }


export default BASE_URL;