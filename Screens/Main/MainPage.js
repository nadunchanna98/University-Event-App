import { View, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native'
import React, { useEffect, useContext } from 'react'
import LastUpdate from './LastUpdate';
import Notes from '../Notes/Notes';
import { NewContext } from '../../Common/Context';


const MainPage = () => {

  const {  refresh, pullMe, fetchMarks, darkTheme } = useContext(NewContext);
 

  useEffect(() => { fetchMarks(); }, []);

  return (

    <ScrollView style={{ ...styles.container, backgroundColor: darkTheme ? '#282C35' : '#fff' }}

      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => pullMe()}
        />
      }
    >

      <View style={styles.items} >


        <LastUpdate />

        {/* notice board */}
        <View style={styles.notice} >
          <Notes />
        </View>
      </View>

    </ScrollView>
  )
}

export default MainPage

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#282C35',
  },

  items: {

    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

  },

  notice: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
  },


})
