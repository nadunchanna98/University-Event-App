import * as React from 'react';
import {  StyleSheet, useWindowDimensions , SafeAreaView ,StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AllResultsContainer from "../Screens/AllResults/AllPostContainer";
import MainPage from "../Screens/Main/MainPage";
import UpComingContainer from "../Screens/UpComing/UpComingContainer";
import TopNavigation from './TopNavigation';

import { NewContext } from '../Common/Context';

const renderScene = SceneMap({
  first: MainPage,
  second: AllResultsContainer,
  third: UpComingContainer
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const {index, setIndex} = React.useContext(NewContext);
 

  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
  ]);

  return (


  <TabView 
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar ={ ()=><TopNavigation index = {index} setIndex = {setIndex} />}
    />

  );
}

