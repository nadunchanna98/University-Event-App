import { View, Text, StyleSheet, RefreshControl, Dimensions, Button } from 'react-native'
import React, {  useEffect, useContext } from 'react'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';


const LastUpdate = () => {

    const { date, fetchDate, darkTheme} = useContext(NewContext);
    
    useEffect(() => {

        fetchDate();

    }, []);


    return (

        <View style={{...styles.container,}} >
            <View>


            {
    !date ?
    <Text style={{...styles.wait, color: darkTheme ? "white" : "black" } } >Loading...</Text>
    : <Text style={{...styles.date, color: darkTheme ? "white" : "black" } } >Last updated at{"\n"}{Moment(date).format('LLL')} </Text>
}


            </View>

        </View>
    )
}

export default LastUpdate


const styles = StyleSheet.create({

    container: {
        flex: 1,
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
        marginTop: 16,
        marginBottom: 16,
        fontFamily: 'sans-serif-light',
    },
})

