import React, { useEffect, useContext } from 'react'
import { View, Button, Alert, Text, StyleSheet, FlatList, Image, Dimensions, RefreshControl, ToastAndroid } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NewContext } from '../../Common/Context';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../../Common/BaseURL';
import axios from 'axios';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

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

            {item.event ? <Text style={{ ...styles.event, color: darkTheme ? "white" : "black" }} >{item.event} </Text> : null}
            {item.firstN ? <Text style={{ ...styles.firstN, color: darkTheme ? "white" : "black" }}><FontAwesome5 name="medal" size={20} color="gold" />  {item.firstN} {item.firstT}</Text> : null}      
            {item.secondN ? <Text style={{ ...styles.secondN, color: darkTheme ? "white" : "black" }}><FontAwesome5 name="medal" size={20} color="#B2B2B2" />  {item.secondN} {item.secondT}</Text>   : null}
            {item.thirdN ? <Text style={{ ...styles.thirdN, color: darkTheme ? "white" : "black" }}><FontAwesome5 name="medal" size={20} color="#CD7F32" />  {item.thirdN} {item.thirdT}</Text> : null}


            <View style={styles.line} >

              {item.description ? <Text style={{ ...styles.description, color: darkTheme ? "white" : "black" }} >{item.description}</Text> : null}

              {item.gender ? 
              <AntDesign name="pushpin" style={{ ...styles.pin, color: darkTheme ? "white" : "black" }} >
                <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }}>  {item.gender}</Text>
              </AntDesign> 
              : null}

              {item.type ? <AntDesign name="pushpin" style={{ ...styles.pin, color: darkTheme ? "white" : "black" }}>
                <Text style={{ ...styles.gender, color: darkTheme ? "white" : "black" }}>  {item.type}</Text>
              </AntDesign> : null}

              {item.date || item.time ? <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }}  > {Moment(item.date).format('LL')}  {Moment(item.time).format('LT')}</Text> : null}

            </View>

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
    margin: Dimensions.get('window').height * 0.02,
    borderRadius: Dimensions.get('window').height * 0.02,
    borderWidth: Dimensions.get('window').width * 0.008,
    borderColor: '#3d6ecf',
    padding: Dimensions.get('window').width * 0.01,
  },

  image: {
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').width * 0.85 * 3 / 4,
    borderRadius: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').width * 0.025,
  },

  line: {
    borderTopWidth: 1,
    borderTopColor: '#336699',
    Width: Dimensions.get('window').width * 0.85,
  },

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
    marginBottom: Dimensions.get('window').width * 0.01,
    marginTop: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.83,
  },

  gender: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.035,
    fontWeight: "500",
    marginBottom: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
    marginTop: Dimensions.get('window').width * 0.05,
    
  },


  location: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: 'center',
  },

  firstN: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.045,
    padding: Dimensions.get('window').width * 0.01,
    fontWeight: "500",
    marginBottom: Dimensions.get('window').width * 0.01
  },

  secondN: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.045,
    padding: Dimensions.get('window').width * 0.01,
    fontWeight: "500",
    marginBottom: Dimensions.get('window').width * 0.01
  },

  thirdN: {
    textTransform: 'capitalize',
    fontSize: Dimensions.get('window').width * 0.045,
    padding: Dimensions.get('window').width * 0.01,
    fontWeight: "500",
    marginBottom: Dimensions.get('window').width * 0.04
  },

  date: {
    padding: Dimensions.get('window').width * 0.005,
    fontSize: Dimensions.get('window').width * 0.035,
    fontWeight: "500",
    textAlign: "center",
    marginTop: Dimensions.get('window').width * 0.02,

  },

  description: {
    padding: Dimensions.get('window').width * 0.005,
    fontSize: Dimensions.get('window').width * 0.038,
    fontWeight: "500",
    textAlign: "center",
    marginTop: Dimensions.get('window').width * 0.04,
  },

  pin: {
    fontSize: Dimensions.get('window').width * 0.035,
    fontWeight: "500",
    marginBottom: Dimensions.get('window').width * 0.01,
    textAlign: 'center',
    marginLeft: Dimensions.get('window').width * 0.01,
    marginTop: Dimensions.get('window').width * 0.02,
   height: Dimensions.get('window').width * 0.04,
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

})