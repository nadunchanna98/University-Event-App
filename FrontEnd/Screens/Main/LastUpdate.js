import { View, Text, StyleSheet, RefreshControl, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Chart from './Chart'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const LastUpdate = () => {

    const { date, fetchDate, event } = useContext(NewContext);
    const navigation = useNavigation();

    useEffect(() => { fetchDate(); }, []);


    return (

        <View >
            <View>
                

                {
                    event === '' ? <Text style={styles.wait}  >Loading...</Text>
                        : <Text style={styles.date} >Last updated {event} {"\n"} At {Moment(date).format('LLL')} </Text>
                }

            </View>

            {/* {
                event === '' ? <Text style={styles.wait}  >Loading...</Text> : <Chart />
            } */}

            <View style={styles.newteventpanel}       >
                <Text style={styles.newtevent} >Add New Event</Text>
                <Ionicons name="add-circle" size={50} color='#336699'
                    style={{ alignSelf: 'center' }
                    } onPress={() => navigation.navigate('NewEvent')}
                />
            </View>




        </View>
    )
}

export default LastUpdate


const styles = StyleSheet.create({

    newteventpanel: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.13,
        backgroundColor: '#F9F9F9',
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#336699',

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
    date: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "700",
        marginTop: 16,
        marginBottom: 16,
        fontFamily: 'sans-serif-light',
    },

    wait: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "700",
        color: '#1947a3',
        marginTop: 16,
        marginBottom: 16,
        fontFamily: 'sans-serif-light',
    },
})    