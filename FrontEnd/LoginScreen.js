import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function LoginScreen() {
  useEffect(() => {
    // check if the user is logged in for the first time
    const user = auth().currentUser;
    const isLoggingInForFirstTime = user.metadata.creationTime === user.metadata.lastSignInTime;

    if (isLoggingInForFirstTime) {
      // request permission to send notifications
      messaging().requestPermission()
        .then(() => {
          console.log('Permission granted');
          // get the FCM token for the user
          messaging().getToken()
            .then((token) => {
              console.log('FCM token:', token);
              // save the token to the user's database record in Firestore
              firestore().collection('users').doc(user.uid).update({
                fcmToken: token
              });
            })
            .catch((error) => {
              console.error('Error getting FCM token:', error);
            });
        })
        .catch((error) => {
          console.error('Permission denied:', error);
        });
    }
  }, []);

  // ...
}
