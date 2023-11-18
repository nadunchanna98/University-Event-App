import { StyleSheet, View, StatusBar, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Context from './Common/Context';
import InshortTabs from './Components/InshortTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo'; //for checking internet connection
import React, { useEffect, useState , useContext } from 'react';
import { NewContext } from './Common/Context';


import NotificationServer2 from './NotificationServer2';
import messaging from '@react-native-firebase/messaging';

import axios from 'axios';
import BASE_URL from './Common/BaseURL'


function App() {

  const { darkTheme, setUserToken  , pullMe} = useContext(NewContext);

  const [isConnected, setIsConnected] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);


  const welcomeMessage = async (token) => {

    let notificationData = {
      title: "Welcome to Event App",
      body: "Hurry up...! Check out the latest events",
      token: token
    }

    // console.log("notificationData--", notificationData);

    await NotificationServer2.sendSingleNotification(notificationData);

  }

  useEffect(() => {

  //  //check internet connection
  //   const unsubscribeNet = NetInfo.addEventListener((state) => {
  //     setIsConnected(state.isConnected);
  //     if (!state.isConnected) {
  //       ToastAndroid.show('No internet connection', ToastAndroid.LONG);
  //       ToastAndroid.show('Please check your internet connection', ToastAndroid.LONG);
  //     } else {
  //       pullMe();
  //     }
  //   });


  //   const requestUserPermission = async () => {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     setPermissionGranted(enabled);

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //       await messaging().subscribeToTopic('EventApp');
  //       const token = await messaging().getToken();
  //       console.log("token : ", token);
  //       setUserToken(token);
       

  //       const newUser = {
  //         token: token,
  //         theme: darkTheme    
  //       }

  //       axios.post(`${BASE_URL}users/user`, newUser)
  //         .then(res => {
  //           console.log("token added to database");
  //           welcomeMessage(token);
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });

        

  //     } else {
  //       console.log("no permission", authStatus);
  //     }
  //   };

  //   requestUserPermission();

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification() 
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });


  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     pullMe();
  //   });


  //   // Register background handler 
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {  
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {


  //     ToastAndroid.show(remoteMessage.notification.title,
  //        ToastAndroid.LONG
  //        );

  //     ToastAndroid.show(
  //       remoteMessage.notification.body,
  //       ToastAndroid.LONG
  //     );

  //     // Alert.alert('A new notification arrived!', JSON.stringify(remoteMessage));
  //   });


  //   return () => {
  //     unsubscribeNet();
  //     unsubscribe();
  //   };

   
  }, []);



  return (

    <View style={{ ...styles.container, backgroundColor: "red" }}   >
      <StatusBar backgroundColor="#000" barStyle="default" />
      <InshortTabs />
    </View>


  );
}

const Stack = createNativeStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={App}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default () => {
  return (
    <Context>
      <AppContainer />
    </Context>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // aligns items horizontally in the center of the screen 
    justifyContent: 'center',  // This is the important line for vertical centering of the content in the container 
  },
});
