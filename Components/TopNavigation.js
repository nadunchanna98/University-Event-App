import { SimpleLineIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React,{useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ToastAndroid, Alert, Linking } from 'react-native'
import { NewContext } from '../Common/Context';
import Modal from 'react-native-modal';

function TopNavigation({ index, setIndex }) {

    const { setDarkTheme, darkTheme, userToken } = React.useContext(NewContext);

    const themeChange = () => {
        setDarkTheme(!darkTheme);

        // axios.put(`${BASE_URL}users/user/${userToken}`, {

        //     theme: !darkTheme

        // }).then((response) => {
        //     console.log("response--", response);
        //     setDarkTheme(response.data.theme);
        // }
        // ).catch((error) => {

        //     // ToastAndroid.show("Theme Not Changed!!", ToastAndroid.LONG);
        //     // ToastAndroid.show('No internet connection', ToastAndroid.LONG);
        //     // ToastAndroid.show('Please check your internet connection', ToastAndroid.LONG);
        //     // console.log("error--", error);
        // }
        // )

    }

    const CustomModal = ({ isVisible, onClose, onContactUs }) => {
        return (
          <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>ESU Mobile App</Text>
              <Text style={styles.text}>
                This app focuses on keeping you updated about events happening at the Engineering Faculty. Through timely notifications, you can stay informed about upcoming events and access all the relevant event details.
              </Text>
              <Text style={styles.text}>
                Additionally, you can find information about past events, including the winners and all details. We also provide special notices to ensure you don't miss any important announcements.
              </Text>
              <Text style={styles.text}>
                Developed by <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/nadun-channa/')}>Nadun Channa</Text>, Computer department, Faculty of Engineering, University of Jaffna
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onContactUs}>
                  <Text style={[styles.buttonText, { color: 'blue' }]}>CONTACT US</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      };


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    return (
        <View style={{ ...styles.container, backgroundColor: "#4682B4" }}>

            {index === 0 ?
                (

                    <TouchableOpacity style={styles.logo}
                        onPress={() =>
                            // setDarkTheme(!darkTheme)
                            themeChange()
                        }

                    >
                        <MaterialCommunityIcons name="theme-light-dark" size={30} color="white" />
                    </TouchableOpacity>

                ) : (index === 1 ? (
                    <TouchableOpacity
                        style={styles.left}
                        onPress={() => setIndex(index === 0 ? 1 : 0)}
                    >
                        <SimpleLineIcons name="arrow-left" size={15} color="white" />

                        <Text
                            style={{ ...styles.text, color: "white", textAlignVertical: "center" }}
                        >
                            <View><Text style={{ ...styles.textRight, color: "white" }}  >Home</Text></View>
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.left}
                        onPress={() => setIndex(index === 2 ? 1 : 2)}
                    >

                        <View style={styles.allandarrowRight} >
                            <View >
                                <SimpleLineIcons name="arrow-left" size={15} color="white" />
                            </View>

                            <View>
                                <Text style={{ ...styles.textRight, color: "white" }}  >All</Text>
                            </View>
                        </View>

                    </TouchableOpacity>

                )
                )
            }

            <Text style={{ ...styles.center, color: "white" }}>
                {index === 0 ? "Home" : (index === 1 ? "Summary " : "Upcoming")}
            </Text>

            {index === 0 ? (

                <TouchableOpacity style={{ ...styles.right, marginEnd: 10 }} onPress={() => setIndex(index === 0 ? 1 : 0)} >

                    {/* this */}
                    <View style={styles.allandarrowLeft}>

                        <View style={{ ...styles.textLeft, color: "white" }}>
                            <Text style={{ ...styles.textLeftAll, color: "white" }}>All</Text>
                        </View>

                        <View >
                            <SimpleLineIcons name="arrow-right" size={15} color="#fff" />
                        </View>
                    </View>

                </TouchableOpacity>
            ) : (index === 1 ? (

                <TouchableOpacity
                    style={{ ...styles.right, marginEnd: 18 }}
                    onPress={() => setIndex(index === 1 ? 2 : 1)}
                >
                    <Text style={{ ...styles.textLeft, color: "white" }} >
                        <View><Text style={{ ...styles.new, color: "white" }}>New</Text></View>
                    </Text>

                    <SimpleLineIcons name="arrow-right" size={15} color="#fff" />
                </TouchableOpacity>
            ) : (

                <TouchableOpacity style={styles.right}  >
                    <Text style={{ ...styles.text, color: "white" }}>

                    <CustomModal
                            isVisible={isModalVisible}
                            onClose={toggleModal}
                            onContactUs={() =>  Linking.openURL(`https://wa.me/+94779672241`) }
                        />
                        <AntDesign
                            name="infocirlce"
                            size={24}
                            color="white"
                            onPress={toggleModal}
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
        padding: 10,
    },

    container: {

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingBottom: 0,
        paddingTop: 0,
        // marginTop: Dimensions.get('window').height * 0.035,
        alignItems: "center",

    },
    center: {
        paddingBottom: 6,
        borderBottomColor: "#fff",
        borderBottomWidth: 5,
        borderRadius: 10,
        fontSize: Dimensions.get('window').width * 0.04,
        fontWeight: "700",
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        width: 40,
        justifyContent: "center",
        flexDirection: "row",

    },
    textLeft: {
        fontWeight: "700",
        alignItems: "center",
        fontSize: Dimensions.get('window').width * 0.04,

        padding: Dimensions.get('window').width * 0.01,

    },

    textLeftAll: {
        fontWeight: "600",
        alignItems: "center",

    },


    textRight: {
        fontWeight: "600",
        alignItems: "center",
        fontSize: Dimensions.get('window').width * 0.04,
        width: Dimensions.get('window').width,
        padding: Dimensions.get('window').width * 0.01,

    },
    new: {

        fontWeight: "600",
        alignItems: "center",
        fontSize: Dimensions.get('window').width * 0.04,
    },

    right: {

        width: 40,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",

    },

    allandarrowRight: {

        width: Dimensions.get('window').width * 0.1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingStart: 0,

    },

    allandarrowLeft: {
        width: Dimensions.get('window').width * 0.1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",

    },

    modalContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      text: {
        marginBottom: 10,
      },
      link: {
        color: 'blue',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      buttonText: {
        color: 'black',
      },


})


export default TopNavigation