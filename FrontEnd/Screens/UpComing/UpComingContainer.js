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




            <Text style={{ ...styles.event, color: darkTheme ? "white" : "black" }}  >{item.event} </Text>

            <View style={{ ...styles.genderType, color: darkTheme ? "white" : "black" }} >

              <View>
                {item.gender || item.type ? <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }} > ( </Text> : null
                }
              </View>

              <View>
                {item.gender ? <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }} >  {item.gender}  </Text> : null
                }
              </View>
              <View>
                {item.gender && item.type ? <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }} > /  </Text> : null
                }
              </View>


              <View>
                {item.type ? <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }} >{item.type} </Text> : null
                }
              </View>


              <View>
                {item.gender || item.type ? <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }} > ) </Text> : null
                }
              </View>

            </View>

            <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }}  > {Moment(item.date).format('LL')}  {Moment(item.time).format('LT')}</Text>


            <View>
              {item.location ? <Text style={{ ...styles.location, color: darkTheme ? "white" : "black" }}>At {item.location}</Text> : null
              }
            </View>

            <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }}>{item.description}</Text>

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
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: 'center',

  },

  genderType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  gender: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: 'center',
  },


  date: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: 'center',
  },

  description: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5
  },

  location: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: 'center',
  },

  post: {
    //backgroundColorImage: backgroundImage,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#3d6ecf',
    padding: Dimensions.get('window').width * 0.01,
  },

  image: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').width * 0.85 * 3 / 4,
    borderRadius: 20,
    marginBottom: 10,
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

  //when the user click on the button, the button will change color



})