import { View, Text, StyleSheet, RefreshControl, Dimensions, Button } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Chart from './Chart'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const LastUpdate = () => {

    const { date, fetchDate, event } = useContext(NewContext);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // await insertDataToDatabase();
            showNotification();
        } catch (error) {
            console.error("error - ", error);
        } finally {
            setIsLoading(false);
        }
    };

    async function showNotification() {
        const notification = new Notifications.Notification({
            title: 'New Data Added',
            body: 'A new data has been added to the database',
        });
        await notification.present();
    }

    



    useEffect(() => {

        fetchDate();


    }, []);


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

            

            <View>
                <Button onPress={handleSubmit} title="Submit" />
            </View>


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
        color: '#1947a3',
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
