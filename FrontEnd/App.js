import { StyleSheet, View, StatusBar, Alert, ToastAndroid } from 'react-native';
import Context from './Common/Context';
import InshortTabs from './Components/InshortTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShareEvent from './Screens/Admin/ShareEvent';
import UpComingContainer from './Screens/UpComing/UpComingContainer';
import EditEvent from './Screens/Admin/EditEvent';
import EditSummeryEvent from './Screens/Admin/EditSummeryEvent';
import NewEvent from './Screens/Admin/NewEvent';
import NewCompletedEvent from './Screens/Admin/NewCompletedEvent';
import NewNote from './Screens/Admin/AddNote';
import NetInfo from '@react-native-community/netinfo'; //for checking internet connection
import React, { useEffect, useState , useContext } from 'react';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
      body: "Hurry up...! Create your first event ",
      token: token
    }

    // console.log("notificationData--", notificationData);

    await NotificationServer2.sendSingleNotification(notificationData);

  }

  useEffect(() => {

   

   
  }, []);



  return (

    <View style={{ ...styles.container, backgroundColor: "red" }}   >
      <StatusBar backgroundColor="#000" barStyle="default" />

      {/* <Text>{isConnected ? 'Connected' : 'Disconnected'}</Text> */}
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
        <Stack.Screen name="ShareEvent" component={ShareEvent} options={{ headerShown: false }} />
        <Stack.Screen name="UpComingContainer" component={UpComingContainer} options={{ headerShown: false }} />
        <Stack.Screen name="EditEvent" component={EditEvent} options={{ headerShown: false }} />
        <Stack.Screen name="EditSummeryEvent" component={EditSummeryEvent} options={{ headerShown: false }} />
        <Stack.Screen name="NewEvent" component={NewEvent} options={{ headerShown: false }} />
        <Stack.Screen name="NewCompletedEvent" component={NewCompletedEvent} options={{ headerShown: false }} />
        <Stack.Screen name="NewNote" component={NewNote} options={{ headerShown: false }} />
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
