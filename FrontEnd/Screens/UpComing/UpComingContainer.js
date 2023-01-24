import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TextInput, RefreshControl, Button, Alert, Modal, Pressable } from 'react-native'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const UpComingContainer = () => {

  const { newPost, refresh, pullMe, getNewPost ,DeletePost } = useContext(NewContext);
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
            <Text style={styles.event}>{item.event} {item.gender}  {item.type}</Text>
            <Text style={styles.date}  > {Moment(item.date).format('LLLL')} </Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.date}>{item.location}</Text>


            <View style={styles.buttonpanel} >

              <View style={styles.buttons} >
                  <Button
                    style={[styles.buttons]}
                    onPress={() => navigation.navigate('ShareEvent', {ID: item._id})    }
                    title="Share"
                  />
              </View>

              <View style={styles.buttons} >
                  <Button
                    style={[styles.buttons]}
                    color='green'
                    onPress={() => navigation.navigate('EditEvent', {ID: item._id})    }
                    title="Edit"
                  />
              </View>

              <View style={styles.buttons} >
                <Button title="Delete" color='red' onPress={() => confirmDelete(item._id)} />
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
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
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
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.33,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
  },

  buttonpanel: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.7,

  },

  buttons: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.05,
    margin:Dimensions.get('window').width * 0.01,
  },


})