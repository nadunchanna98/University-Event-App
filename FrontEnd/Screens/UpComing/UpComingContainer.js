import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView, RefreshControl, Button } from 'react-native'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';


const UpComingContainer = ({navigation}) => {

  const { newPost, refresh, pullMe, getNewPost } = useContext(NewContext);



  const SharePost = (item) => {
    navigate('/ShareEvent', { state: item });
  }

  const DeletePost = (id) => {

    console.log(id);
    axios.delete(`${BASE_URL}futureevents/delete/${id}`)
      .then(res => {
        console.log("success");
        getNewPost();
      })
      .catch(err => {
        console.log(err);
      })
  }

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
        renderItem={({ item }) =>

          <View style={styles.post}>

            <Image style={styles.image} source={item.image ? { uri: item.image } : { uri: 'https://m.marketplacepin.com/images/no-photos.png' }} />
            <Text style={styles.event}>{item.event} {item.gender}  {item.type}</Text>
            <Text style={styles.date}  > {Moment(item.date).format('LLLL')} </Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.date}>{item.location}</Text>

            <View style={styles.buttonpanel} >
              <View style={styles.buttons} >
                <Button title="Share" color="#408cb2" onPress={() => SharePost(item)} />
              </View>
              <View style={styles.buttons} >
                <Button title="Delete " color='red' onPress={() => DeletePost(item._id)} />
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
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.05,
    margin: 10,
  },


})