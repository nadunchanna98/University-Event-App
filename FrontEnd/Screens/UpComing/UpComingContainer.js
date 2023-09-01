import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions, RefreshControl, Button, Alert } from 'react-native'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import newB from '../../Components/newB.jpg';
// import newW from '../../Components/newW.jpg';


const UpComingContainer = () => {

  const { newPost, refresh, pullMe, getNewPost, DeletePost, darkTheme } = useContext(NewContext);
  const navigation = useNavigation();

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this Event?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => DeletePost(id) }
      ],
      { cancelable: false }
    );
  };





  useEffect(() => { getNewPost(); }, []);



  return (

    <View
      style={{ ...styles.AllPostContainer, backgroundColor: darkTheme ? '#282C35' : '#fff' }}
    >

      <FlatList

        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullMe()}
          />

        }

        data={newPost}
        renderItem={({ item, index }) =>

          <View style={{ ...styles.post, backgroundColor: darkTheme ? "#282C35" : "white" }}>

            {/* <Image style={styles.image} source={item.image ? { uri: item.image } : { uri: 'https://m.marketplacepin.com/images/no-photos.png' }} /> */}

            <Image
              style={styles.image}
              source={
                item.image
                  ? { uri: item.image }
                  : darkTheme
                    ? require('../../Components/newB.jpg')
                    : require('../../Components/newW.jpg')
              }
            />

            {item.event ? <Text style={{ ...styles.event, color: darkTheme ? "white" : "black" }}>
              {item.event}
            </Text> : null}

            {item.gender ? <AntDesign name="pushpin" style={{ ...styles.gender, color: "red" }} >
              <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }}>  {item.gender}</Text>
            </AntDesign> : null}

            {item.type ? <AntDesign name="pushpin" style={{ ...styles.type, color: "red" }}>
              <Text style={{ ...styles.type, color: darkTheme ? "white" : "black" }}>  {item.type}</Text>
            </AntDesign> : null}

            {item.date || item.time ? <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }}>
              {Moment(item.date).format('LL')}  {Moment(item.time).format('LT')}
            </Text> : null}

            {item.location ?
              <Text style={{ ...styles.location, color: darkTheme ? "white" : "black" }}>
                At {item.location}
              </Text>
              : null}

            {item.description ?
              <Text style={{ ...styles.description, color: darkTheme ? "white" : "black" }}>
              {item.description}
            </Text>
              : null}
            

            <View style={styles.buttonpanel} >

              <View style={styles.buttons} >
                <FontAwesome name="share-square-o" size={50} color="#1947a3"
                  onPress={() => navigation.navigate('ShareEvent', { ID: item._id })}
                />
              </View>

              <View style={styles.buttons} >

                <FontAwesome name="edit" size={50} color="#1947a3"
                  onPress={() => navigation.navigate('EditEvent', { ID: item._id })}
                />
              </View>

              <View style={styles.buttons} >
                <MaterialIcons name="delete-outline" size={50} color="#1947a3"
                  onPress={() => confirmDelete(item._id)}
                />
              </View>

            </View>

          </View>
        }
        keyExtractor={item => item._id}
      />




    </View>
  )
}

export default UpComingContainer


const styles = StyleSheet.create({

  AllPostContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#F9F9F9',
    paddingBottom: Dimensions.get('window').height * 0.1,
  },
  event: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.058,
    fontWeight: "700",
    marginBottom: Dimensions.get('window').width * 0.03,
    marginTop: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.83,
  },

  gender: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: "600",
    marginBottom: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.83,
    textDirection: 'column',
  },

  type: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: "600",
    marginBottom: Dimensions.get('window').width * 0.03,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.83,
    textDirection: 'column',
  },


  date: {
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: "500",
    marginBottom: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
  },

  description: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: "400",
    marginBottom: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.83,
  },

  location: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: "500",
    marginBottom: Dimensions.get('window').width * 0.03,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.83,
  },

  post: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Dimensions.get('window').width * 0.05,
    borderRadius: Dimensions.get('window').width * 0.05,
    borderWidth: Dimensions.get('window').width * 0.008,
    borderColor: '#3d6ecf',
    padding: Dimensions.get('window').width * 0.01,
    paddingBottom: Dimensions.get('window').width * 0.05,
  },

  image: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').width * 0.85 * 3 / 4,
    borderRadius: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').width * 0.025,
  },

  buttonpanel: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.7,
    marginEnd: Dimensions.get('window').width * 0.0,
    marginStart: Dimensions.get('window').width * 0.08,
    paddingBottom: Dimensions.get('window').height * 0.01,
    marginTop: Dimensions.get('window').height * 0.01,
  },

  buttons: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.1,
    margin: Dimensions.get('window').width * 0.01,

  },

})