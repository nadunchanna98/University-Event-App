import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl ,TouchableOpacity } from 'react-native'
import React, { useEffect, useContext } from 'react'
import LastUpdate from './LastUpdate';
import { NewContext } from '../../Common/Context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const MainPage = () => {

  const { marks, refresh, pullMe, fetchMarks , darkTheme } = useContext(NewContext);
  const navigation = useNavigation();

  useEffect(() => { fetchMarks(); }, []);

  return (

    <ScrollView style={{...styles.container, backgroundColor: darkTheme ? '#282C35' : '#fff'}}

      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => pullMe()}
        />
      }
    >

      <View style={styles.items} >


        <LastUpdate />

        <TouchableOpacity style={styles.newteventpanel}   
        
         onPress={() => navigation.navigate('NewEvent')}
        
        >
          <Text style={{...styles.newtevent, color: darkTheme ? "white" : "black"  }} >Add New Event</Text>
          <Ionicons name="add-circle" size={50} color='#336699'    style={styles.plus}  />
        </TouchableOpacity>


        {/* <View style={styles.topic} >
  <Text style={styles.latest} >Total Marks</Text>
</View>

<View style={styles.post} >

  {marks.map((item, index) => {

    return (

      <View style={styles.bag} key={index}>
        <Text style={styles.team}> {item.team}</Text>
        <Text style={styles.marks}>  {item.total}</Text>
        <Text style={styles.text}> ( Up to now ) </Text>

      </View>
    )
  })
  }

</View> */}

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

  newteventpanel: {
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.18,
    // backgroundColor: '#F9F9F9',
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#336699',

  },

  plus: {
    alignSelf: 'center',
    marginTop: 0,
    alignContent: 'center',
    justifyContent: 'center',

  },

  newtevent: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "700",
    color: '#336699',
    marginTop: 16,
    marginBottom: 1,
    fontFamily: 'sans-serif-light',

  },


  latest: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "700",
    padding: 16,
    marginTop: 16,
    fontFamily: 'sans-serif-light',
  },

  post: {

    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FF1E1E',
    padding: 10,

  },

  topic: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 6,
    textAlign: 'center',
  },



  team: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 5,

  },

  marks: {
    color: 'red',
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 5
  },

  text: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5
  },

  bag: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
    marginBottom: 2,
    borderRadius: 20,
    borderRadius: 20,
    borderWidth: 4,
    backgroundColor: '#FEED30'
  },

  


})
