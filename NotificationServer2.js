const sendSingleNotification = (notificationData) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key=AAAAZocyabU:APA91bGhGZak1yYyLLYZ3-cEQ5ftSobA5psxsYuRZ0sqK-kGw6x7vV5XgMKF6iujD_MgnIgdqapfaTAYteWPs7OgYTxMFkEM_kWzf7yMLG_4wp4lFfjLHfg-kqXNQNmPNqsvVRXVvjr_");

    var raw = JSON.stringify({
        "data": {},
        "notification": {
            "body": notificationData.body,
            "title": notificationData.title,

        },
        "to": notificationData.token
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

};

const sendMultipleNotification = (notificationData) => {

    console.log(notificationData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "key=AAAAZocyabU:APA91bGhGZak1yYyLLYZ3-cEQ5ftSobA5psxsYuRZ0sqK-kGw6x7vV5XgMKF6iujD_MgnIgdqapfaTAYteWPs7OgYTxMFkEM_kWzf7yMLG_4wp4lFfjLHfg-kqXNQNmPNqsvVRXVvjr_");

    var raw = JSON.stringify({
        "data": {},
        "notification": {
            "body": notificationData.body,
            "title": notificationData.title,

        },
        "registration_ids": notificationData.token
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

};

export default {
    sendSingleNotification ,
    sendMultipleNotification,
};