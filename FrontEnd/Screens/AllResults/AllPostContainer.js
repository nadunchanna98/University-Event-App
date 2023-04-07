import React, { useEffect, useContext } from 'react'
import { View, Button, Alert, Text, StyleSheet, FlatList, Image, Dimensions, RefreshControl, ToastAndroid } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NewContext } from '../../Common/Context';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../../Common/BaseURL';
import axios from 'axios';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';


const AllPostContainer = () => {

  const { post, refresh, pullMe, getPost, darkTheme } = useContext(NewContext);
  const navigation = useNavigation();

  useEffect(() => { getPost(); }, []);

  const DeletePost = (id) => {

    console.log(id);
    axios.delete(`${BASE_URL}pastevents/delete/${id}`)
      .then(res => {
        console.log("success");
        ToastAndroid.show("Event Deleted Successfully", ToastAndroid.LONG);
        getPost();
      })
      .catch(err => {
        ToastAndroid.show("Event Not Deleted!!", ToastAndroid.LONG);
        console.log(err);
      })
  }

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


  return (

    <View style={{ ...styles.AllPostContainer, backgroundColor: darkTheme ? '#282C35' : '#fff' }} >


      <FlatList

        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullMe()}
          />
        }


        data={post}
        renderItem={({ item }) =>

          <View style={{ ...styles.post, backgroundColor: darkTheme ? "#282C35" : "white" }}>

            {/* <Image style={styles.image} source={item.image ? { uri: item.image } : { uri: 'https://m.marketplacepin.com/images/no-photos.png' }} />
           */}

            <Image
              style={styles.image}
              source={
                item.image
                  ? { uri: item.image }
                  : darkTheme
                    ? require('../../Components/completedB.jpg')
                    : require('../../Components/completedW.jpg')
              }
            />

            <Text style={{ ...styles.event, color: darkTheme ? "white" : "black" }} >{item.event} </Text>

            <View style={styles.genderType} >

              <View>
                {item.gender || item.type ? <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }}> ( </Text> : null
                }
              </View>

              <View>
                {item.gender ? <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }}>  {item.gender}  </Text> : null
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


            <Text style={{ ...styles.firstN, color: darkTheme ? "white" : "black" }}><FontAwesome5 name="medal" size={20} color="gold" />  {item.firstN} {item.firstT}</Text>
            <Text style={{ ...styles.secondN, color: darkTheme ? "white" : "black" }}><FontAwesome5 name="medal" size={20} color="#B2B2B2" />  {item.secondN} {item.secondT}</Text>
            <Text style={{ ...styles.thirdN, color: darkTheme ? "white" : "black" }}><FontAwesome5 name="medal" size={20} color="#CD7F32" />  {item.thirdN} {item.thirdT}</Text>

            <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }}  > {Moment(item.date).format('LL')}  {Moment(item.time).format('LT')}</Text>
            <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }} >{item.description}</Text>

            <View style={styles.buttonpanel} >



              <View style={styles.buttons} >
                <FontAwesome name="edit" size={50} color="#1947a3"
                  onPress={() => navigation.navigate('EditSummeryEvent', { ID: item._id })}
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

export default AllPostContainer


const styles = StyleSheet.create({

  post: {
    flexDirection: 'column',
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


  buttonpanel: {

    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.1,
    marginTop: Dimensions.get('window').height * 0.02,
    paddingBottom: Dimensions.get('window').height * 0.01,

  },

  buttons: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').height * 0.1,
    margin: Dimensions.get('window').width * 0.01,
  },

  image: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').width * 0.85 * 3 / 4,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
  },


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
    marginBottom: 10

  },

  genderType: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  gender: {
    textTransform: 'capitalize',
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 5,
    textAlign: 'center',
  },


  location: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: 'center',
  },

  firstN: {
    textTransform: 'capitalize',
    fontSize: 20,
    padding: 3,
    fontWeight: "500",
    marginBottom: 5
  },

  secondN: {
    textTransform: 'capitalize',
    fontSize: 20,
    padding: 3,
    fontWeight: "500",
    marginBottom: 5
  },

  thirdN: {
    textTransform: 'capitalize',
    fontSize: 20,
    padding: 3,
    fontWeight: "500",
    marginBottom: 13
  },

  date: {
    padding: 3,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center"
  },

  description: {
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 5
  },





})