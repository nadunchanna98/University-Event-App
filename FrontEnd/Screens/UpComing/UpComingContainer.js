import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TextInput, RefreshControl, Button, Alert, Modal, Pressable } from 'react-native'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const UpComingContainer = () => {

  const { newPost, refresh, pullMe, getNewPost, DeletePost } = useContext(NewContext);
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

    <View style={styles.AllPostContainer}  >

      <FlatList

        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullMe()}
          />

        }

        data={newPost}
        renderItem={({ item, index }) =>

          <View style={styles.post}>

            <Image style={styles.image} source={item.image ? { uri: item.image } : { uri: 'https://m.marketplacepin.com/images/no-photos.png' }} />
            <Text style={styles.event}>{item.event} </Text>

            <View style={styles.genderType} >

              <View>
                {item.gender || item.type ? <Text style={styles.gender} > ( </Text> : null
                }
              </View>

              <View>
                {item.gender ? <Text style={styles.gender} >  {item.gender}  </Text> : null
                }
              </View>
              <View>
                {item.gender && item.type ? <Text style={styles.gender} > /  </Text> : null
                }
              </View>


              <View>
                {item.type ? <Text style={styles.gender} >{item.type} </Text> : null
                }
              </View>


              <View>
                {item.gender || item.type ? <Text style={styles.gender} > ) </Text> : null
                }
              </View>

            </View>

            <Text style={styles.date}  > {Moment(item.date).format('LL')}  {Moment(item.time).format('LT')}</Text>


            <View>
              {item.location ? <Text style={styles.location}>At {item.location}</Text> : null
              }
            </View>

            <Text style={styles.description}>{item.description}</Text>

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
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.9,
    backgroundColor: '#F9F9F9',
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
    padding: Dimensions.get('window').width * 0.05,
  },

  image: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75 * 3 / 4,
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

  },

  buttons: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.05,
    margin: Dimensions.get('window').width * 0.01,

  },


})