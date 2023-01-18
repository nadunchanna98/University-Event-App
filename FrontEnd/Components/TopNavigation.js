import {  SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image ,StatusBar } from 'react-native'
import Eweek from '../assets/icon.png';

function TopNavigation({ index, setIndex }) {

    return (
        <View style={{ ...styles.container, backgroundColor: "#FF1E1E" }}>

            {index === 0 ? (

                <TouchableOpacity style={styles.logo}>
                    <Image source={Eweek} style={styles.logo} />
                    


                </TouchableOpacity>) : (index === 1 ? (
                    <TouchableOpacity
                        style={styles.left}
                        onPress={() => setIndex(index === 0 ? 1 : 0)}
                    >
                        <SimpleLineIcons name="arrow-left" size={15} color="white" />
                        <Text
                            style={{ ...styles.text, color: "white", textAlignVertical: "center" }}
                        >
                            <View><Text style={{ ...styles.text, color: "white" }}  >Home</Text></View>
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.left}
                        onPress={() => setIndex(index === 2 ? 1 : 2)}
                    >
                        <SimpleLineIcons name="arrow-left" size={15} color="White" />
                        <Text style={{ ...styles.text, color: "white" }}>
                            <View><Text style={{ ...styles.text, color: "white" }}  >All </Text></View>
                        </Text>
                    </TouchableOpacity>

                )
            )
            }

            <Text style={{ ...styles.center, color: "white" }}>
                {index === 0 ? "Home" : (index === 1 ? "Summary " : "Upcoming Events")}
            </Text>

            {index === 0 ? (

                <TouchableOpacity style={styles.right} onPress={() => setIndex(index === 0 ? 1 : 0)} >
                    <Text style={{ ...styles.text, color: "white" }}>
                        All
                        <SimpleLineIcons name="arrow-right" size={15} color="#fff" />
                    </Text>
                </TouchableOpacity>
            ) : (index === 1 ? (

                <TouchableOpacity
                    style={{ ...styles.right, marginEnd: 18 }}
                    onPress={() => setIndex(index === 1 ? 2 : 1)}
                >
                    <Text style={{ ...styles.text, color: "white" }} >
                        <View><Text style={{ ...styles.new, color: "white" }}>New</Text></View>
                    </Text>

                    <SimpleLineIcons name="arrow-right" size={15} color="#fff" />
                </TouchableOpacity>
            ) : (

                <TouchableOpacity style={styles.right}  >
                    <Text style={{ ...styles.text, color: "white" }}>


                        <AntDesign name="infocirlce" size={24} color="white"   
                        onPress={() => alert("E-week 2K22 Faculty of Engineering \nUniversity of Jaffna.\nCreated by Nadun Channa.")}
                        />

                    </Text>
                </TouchableOpacity>
            )

            )
            }


        </View>
    )
}

const styles = StyleSheet.create({

    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginTop: 0,
        marginBottom: 0,
    },

    container: {
        
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.09,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingBottom: 0,
        paddingTop: 0,
        alignItems: "center",

    },
    center: {
        paddingBottom: 6,
        borderBottomColor: "#fff",
        borderBottomWidth: 5,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: "700",
        alignItems: "center",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        width: 40,
        justifyContent: "center",
        flexDirection: "row",



    },
    text: {
        fontSize: 16,
        fontWeight: "700",
        alignItems: "center",

    },
    new: {
        fontSize: 16,
        fontWeight: "700",
        alignItems: "center",
        marginRight: 10,
    },

    right: {

        width: 40,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",

    },

})


export default TopNavigation