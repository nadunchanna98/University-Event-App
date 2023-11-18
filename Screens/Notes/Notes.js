import { View, Text, StyleSheet, Dimensions,ToastAndroid , Alert } from 'react-native'
import React, {  useEffect, useContext } from 'react'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Notes = () => {

    const { notes, fetchNotes, darkTheme } = useContext(NewContext);

    useEffect(() => {
        fetchNotes();
    }, []);


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
                                    <Text style={{ ...styles.body, color: darkTheme ? "white" : "black" }} >{item.body}</Text>
                                
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
        paddingBottom: 5,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#336699',
    },

    Topic: {
        paddingTop: Dimensions.get('window').height*0.01,
        paddingBottom: Dimensions.get('window').height*0.01,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height*0.035,
        fontWeight: "700",
        fontFamily: 'sans-serif-light',
        marginTop: 0,
        
    },

    date: {
  
        fontSize: Dimensions.get('window').height*0.02,
        fontWeight: "700",
        fontFamily: 'sans-serif-light',
        marginTop: Dimensions.get('window').height*0.01,
        marginBottom: Dimensions.get('window').height*0.02,
        textTransform: 'none',
        textTransform: 'capitalize',
    },


    body: {
        fontSize: Dimensions.get('window').height*0.025,
        fontWeight: "600",
        textAlign: 'justify',
        fontFamily: 'sans-serif-light',
    },

    card: {
        alignItems: 'stretch',
        width: Dimensions.get('window').width * 0.8,
        marginTop: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height * 0.02,
        padding: Dimensions.get('window').height * 0.02,
        borderTopWidth: Dimensions.get('window').height * 0.002,
        borderTopColor: '#336699'

    },


})

