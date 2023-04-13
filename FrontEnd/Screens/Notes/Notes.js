import { View, Text, StyleSheet, Dimensions,ToastAndroid , Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Notes = () => {

    const { notes, fetchNotes, darkTheme } = useContext(NewContext);
    const navigation = useNavigation();

    useEffect(() => {
        fetchNotes();
    }, []);

    const confirmDelete = (id) => {
        Alert.alert(
            "Delete Note ?",
            "Are you sure you want to delete this Note ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteNoteHandler(id) }
            ],
            { cancelable: false }
        );
    }

    const deleteNoteHandler = (id) => {
        axios.delete(`${BASE_URL}notes/note/${id}`)


            .then(res => {
                console.log(res.data);
                ToastAndroid.show("Note Deleted Successfully", ToastAndroid.SHORT);
                fetchNotes();
            })
            .catch(err => {
                console.log(err);
                ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
            })
    }



    return (

        <View style={{ ...styles.container, }} >
         

                <Text style={{ ...styles.Topic, color: darkTheme ? "white" : "black" }} >Notice Board</Text>

                {
                    notes == '' ? (<Text style={{ ...styles.wait, color: darkTheme ? "white" : "black" }} >No any notice!!</Text>)
                        :

                        notes.map((item, index) => {
                            return (
                                <View key={index} style={styles.card} >
                                    <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }} >{Moment(item.date).format('MMMM Do YYYY, h:mm a')}</Text>
                                    {/* <Text style={{ ...styles.title, color: darkTheme ? "white" : "black" }} >{item.title}</Text> */}
                                    <Text style={{ ...styles.body, color: darkTheme ? "white" : "black" }} >{item.body}</Text>
                                    

                                    <View style={styles.buttonpanel} >



                                        <View style={styles.buttons} >
                                            <FontAwesome name="edit" size={50} color="#1947a3"
                                                onPress={() => navigation.navigate('EditNote', { ID: item._id })}
                                            />
                                        </View>

                                        <View style={styles.buttons} >
                                            <MaterialIcons name="delete-outline" size={50} color="#1947a3"
                                                onPress={() => confirmDelete(item._id)}
                                            />
                                        </View>

                                    </View>


                                </View>
                            )
                        }
                        )


                }

           




        </View>
    )
}

export default Notes


const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width*0.9,
        marginTop: Dimensions.get('window').height*0.02,
        marginBottom: Dimensions.get('window').height*0.02,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#336699',
    },

    wait: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "500",
        fontFamily: 'sans-serif-light',
        marginTop: 0,
        
    },
    Topic: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "700",
        fontFamily: 'sans-serif-light',
        marginTop: 0,
        
    },

    date: {
  
        fontSize: 14,
        fontWeight: "700",
        fontFamily: 'sans-serif-light',
        marginTop: 2,
        marginBottom: 10,
        textTransform: 'none',
        textTransform: 'capitalize',
    },

    title: {
        fontSize: 17,
        fontWeight: "700",
        fontFamily: 'sans-serif-light',
        marginTop: 2,
        marginBottom: 0,
        textTransform: 'none',
        textTransform: 'capitalize',
    },

    body: {
        fontSize: 18,
        fontWeight: "700",

        fontFamily: 'sans-serif-light',
    },

    buttonpanel: {

        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.1,
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height * 0.001,
    
      },
    
      buttons: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').height * 0.1,
        margin: Dimensions.get('window').width * 0.01,
      },

    card: {
        alignItems: 'stretch',
        width: Dimensions.get('window').width * 0.8,
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height * 0.02,
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#336699'

    },


})

