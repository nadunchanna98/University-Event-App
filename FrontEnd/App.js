import { StyleSheet, View, StatusBar } from 'react-native';
import Context from './Common/Context';
import InshortTabs from './Components/InshortTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShareEvent from './Screens/Admin/ShareEvent';
import UpComingContainer from './Screens/UpComing/UpComingContainer';
import EditEvent from './Screens/Admin/EditEvent';
import EditSummeryEvent from './Screens/Admin/EditSummeryEvent';
import NewEvent from './Screens/Admin/NewEvent';

function App() {
  return (

      <View style={styles.container}  >
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
        <Stack.Screen name="ShareEvent" component={ShareEvent} options={{ headerShown: false }}  />
        <Stack.Screen name="UpComingContainer" component={UpComingContainer} options={{ headerShown: false }}  />
        <Stack.Screen name="EditEvent" component={EditEvent} options={{ headerShown: false }}  />
        <Stack.Screen name="EditSummeryEvent" component={EditSummeryEvent} options={{ headerShown: false }}  />
        <Stack.Screen name="NewEvent" component={NewEvent} options={{ headerShown: false }}  />
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
