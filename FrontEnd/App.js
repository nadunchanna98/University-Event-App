import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import Context from './Common/Context';
import InshortTabs from './Components/InshortTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShareEvent from './Screens/Admin/ShareEvent';
import UpComingContainer from './Screens/UpComing/UpComingContainer';
import EditEvent from './Screens/Admin/EditEvent';
import EditSummeryEvent from './Screens/Admin/EditSummeryEvent';
import NewEvent from './Screens/Admin/NewEvent'; 
import React, { useEffect , useState } from 'react';

import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import BASE_URL from './Common/BaseURL'


function App() {

  const [permissionGranted, setPermissionGranted] = useState(false);


  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      setPermissionGranted(enabled);

      if (enabled) {
        console.log('Authorization status:', authStatus);
        await messaging().subscribeToTopic('EventApp');
        const token = await messaging().getToken();
        console.log("token : ", token);

        const newUser = {
          token: token
        }

        axios.post(`${BASE_URL}users/token`, newUser)
          .then(res => {
            console.log("token added to database");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("no permission", authStatus);
      }
    };

    requestUserPermission();

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);



  return (

    <View style={{ ...styles.container, backgroundColor: "red" }}   >
      <StatusBar backgroundColor="#000" barStyle="default" />
      <InshortTabs />

      {/* <Button title="send notification" onPress={() => sendNotification() } /> */}


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
        <Stack.Screen name="ShareEvent" component={ShareEvent} options={{ headerShown: false }} />
        <Stack.Screen name="UpComingContainer" component={UpComingContainer} options={{ headerShown: false }} />
        <Stack.Screen name="EditEvent" component={EditEvent} options={{ headerShown: false }} />
        <Stack.Screen name="EditSummeryEvent" component={EditSummeryEvent} options={{ headerShown: false }} />
        <Stack.Screen name="NewEvent" component={NewEvent} options={{ headerShown: false }} />
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

    // marginTop:StatusBar.currentHeight *0.01,
    alignItems: 'center', // aligns items horizontally in the center of the screen 
    justifyContent: 'center',  // This is the important line for vertical centering of the content in the container 
  },
});
