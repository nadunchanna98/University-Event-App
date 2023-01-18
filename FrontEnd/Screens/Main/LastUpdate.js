import { View, Text, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Chart from './Chart'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';

const LastUpdate = () => {

    const { date, fetchDate , event } = useContext(NewContext);

    useEffect(() => { fetchDate(); }, []);


    return (

        <View >
            <View>

                {
                    event === '' ? <Text style={styles.wait}  >Loading...</Text>
                        : <Text style={styles.date} >Last updated {event} {"\n"} At {Moment(date).format('LLL')} </Text>
                }

            </View>

            {
                event === '' ? <Text style={styles.wait}  >Loading...</Text> : <Chart />
            }

        </View>
    )
}

export default LastUpdate


const styles = StyleSheet.create({

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
        color: 'red',
        marginTop: 16,
        marginBottom: 16,
        fontFamily: 'sans-serif-light',
    },
})    