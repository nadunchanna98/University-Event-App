import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useContext } from 'react'
import Chart from './Chart'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';

const LastUpdate = () => {

    const { date, fetchDate, darkTheme } = useContext(NewContext);

    useEffect(() => {

        fetchDate();

    }, []);


    return (

        <View style={{ ...styles.container, }} >
            <View>


                {
                    !date ?
                        <Text style={{ ...styles.wait, color: darkTheme ? "white" : "black" }} >Loading...</Text>
                        : <Text style={{ ...styles.date, color: darkTheme ? "white" : "black" }} >Last updated at{"\n"}{Moment(date).format('LLL')} </Text>
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



// import React, { useState } from 'react';
// import * as Notifications from 'expo-notifications';
// import { View, Button } from 'react-native';
// import { insertDataToDatabase } from './database';

// const MyComponent = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       const data = await insertDataToDatabase();
//       showNotification(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   async function showNotification(data) {
//     const notification = new Notifications.Notification({
//       title: 'New Data Added',
//       body: `A new data with "${data}" has been added to the database`,
//     });
//     await notification.present();
//   }

//   return (
//     <View>
//       <Button onPress={handleSubmit} title="Submit" />
//     </View>
//   );
// };

// export default MyComponent;
