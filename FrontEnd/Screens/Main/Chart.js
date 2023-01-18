import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Dimensions  } from "react-native";
import { BarChart } from 'react-native-chart-kit';

import { NewContext } from '../../Common/Context';

export default function Chart() {

    const { fetchMarks , marks } = useContext(NewContext);

    let data = { 
        labels: marks.map((item, index) => {
            return item.team
        }),
        datasets: [
            {
                data: marks.map((item, index) => {
                    return (
                        item.total
                    )
                }
                ) 
            }
        ]
    };

    useEffect(() => {  fetchMarks();  }  , []);

    return (


        <View style={styles.container} >

            <BarChart

                data={data}
                width={Dimensions.get('window').width * 0.87}
                height={220}
                showValuesOnTopOfBars={true}

                chartConfig={{
                    backgroundColor: '#A20E0E',
                    backgroundGradientFrom: '#FEED30',
                    backgroundGradientTo: '#FEED30',
                    decimalPlaces: 0,
                    color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}

                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}


            />
        </View>
    )
}


const styles = StyleSheet.create({


    container: {
        justifyContent: 'center',
        paddingTop: 6,
        textAlign: 'center',
        width: Dimensions.get('window').width * 0.9,
        //height: Dimensions.get('window').height*0.9,
        // backgroundColor: '#ecf0f1',

        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#FF1E1E',
    },


})





