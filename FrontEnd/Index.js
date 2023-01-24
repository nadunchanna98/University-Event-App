import { StyleSheet, View, StatusBar } from 'react-native';
import Context from './Common/Context';
import InshortTabs from './Components/InshortTabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Index() {
  return (

        <View style={styles.container}  >
          <StatusBar backgroundColor="#000" barStyle="default" />
          <InshortTabs />
        </View>

  );
}

export default () => {
  return (
    <Context>
      <Index />
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
