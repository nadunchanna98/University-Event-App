import React, { useState, useContext, useEffect, useRef } from 'react';
import { Alert, Animated, Modal, StyleSheet, TouchableOpacity, Text, Image, Dimensions, View, Button, ScrollView, ToastAndroid } from 'react-native'
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../src/config'  // for image upload for firebase
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from "moment";
import NotificationServer2 from '../../NotificationServer2'   // for notification for firebase
import { SelectList } from 'react-native-dropdown-select-list'

const NewCompleteEvent = ({ route }) => {

    const { pullMe, darkTheme, getTokens, tokens } = useContext(NewContext);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();


    const [photoShow, setPhotoShow] = React.useState(null);
    const [imagef, setImagef] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {

        setModalVisible(true);
        getTokens();

    }, []);

    const [progress, setProgress] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: progress,
            duration: 1000, // You can adjust the duration as needed
            useNativeDriver: false,
        }).start();
    }, [progress]);



    const sendNotification = async (data) => {

        // console.log("data--", data);

        let notificationData = {
            title: `Check out the winners of ${data.event}!`,
            body: ` 🥇 Top spot: ${data.firstN}\n 🥈 Second spot: ${data.secondN}\n 🥉 Third spot: ${data.thirdN}`,
            token: tokens
        }

        // console.log("notificationData--", notificationData);

        await NotificationServer2.sendMultipleNotification(notificationData);
        // NotificationServer(notificationData);
    };


    const confirmModalClose = () => {
        Alert.alert(
            "Discard Create ?",
            "Are you sure you want to discard Create ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
        );
    };




    const signUpValidationSchema = yup.object().shape({
        event: yup
            .string()
            // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
            .required('Event Name is required'),
        location: yup
            .string(),
        gender: yup
            .string(),
        description: yup
            .string()
            .min(0, ({ min, value }) => `${min - value.length} characters to go`),

        firstN: yup
            .string(),
        secondN: yup
            .string(),
        thirdN: yup
            .string(),
        description: yup
            .string()
            .min(0, ({ min, value }) => `${min - value.length} characters to go`),
        // photo: yup.object().required('Photo is required'),
    })

    const takePhotoAndUpload = async () => {

        setIsUploading(true);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) {
            setIsUploading(false);
            return;
        }

        const source = { uri: result.uri };

        setImagef(source);

        // console.log("source--", source);
        // console.log("imagef--", imagef);

        uploadImage(source.uri);

    }

    //firebase image upload
    const uploadImage = async (uri) => {

        console.log("im from uploadimage--", uri);
        setProgress(0);

        if (!uri) { // Check if the uri is null before proceeding with the upload
            setUploading(false);
            return;
        }

        setUploading(true);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = uri.substring(uri.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename).put(blob);



            ref.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log(`Upload is ${progress}% done`);
                    setProgress(progress);

                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await ref;


                    const url = await ref.snapshot.ref.getDownloadURL();
                    console.log("url--", url);
                    setPhotoShow(url);
                    setImagef(url);
                    setUploading(false);
                    setIsUploading(false);

                }
            );
        } catch (e) {
            console.log(e);
            setUploading(false);

        } finally {
            setProgress(0);
        }
    };


    const width = animation.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    const dicardImage = () => {



        setPhotoShow(null);
        setImagef(null);
        setIsUploading(false);
        setUploading(false);
        setProgress(0);


    }

    //date picker
    const [mydate, setMyDate] = useState(new Date());
    const [displaymode, setDisplayMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);

    const changeSelectedDate = (event, selectedDate) => {

        const currentDate = selectedDate || mydate;
        setMyDate(currentDate);
        setShow(false);

    };

    const showMode = (currentMode) => {
        setShow(true);
        setDisplayMode(currentMode);

    };

    const displayDatepicker = () => {
        showMode('date');
    };

    //time picker
    const [mytime, setMyTime] = useState(new Date());
    const [displaymode1, setDisplayMode1] = useState('time');
    const [isDisplayTime, setShow1] = useState(false);

    const changeSelectedTime = (event, selectedTime) => {

        const currentTime = selectedTime || mytime;
        setMyTime(currentTime);
        setShow1(false);

    };

    const showMode1 = (currentMode) => {
        setShow1(true);
        setDisplayMode1(currentMode);

    };

    const displayTimepicker = () => {
        showMode1('time');
    };

    const handleSubmit = (values) => {


        const formData = {

            event: values.event,
            firstN: values.firstN,
            secondN: values.secondN,
            thirdN: values.thirdN,
            firstT: values.firstT,
            secondT: values.secondT,
            thirdT: values.thirdT,
            location: values.location,
            type: selectedType,
            gender: selectedGender,
            date: Moment(mydate).format('YYYY-MM-DD'),
            time: mytime,
            image: imagef,
            description: values.description

        }

        // console.log(formData)

        axios.post(`${BASE_URL}pastevents/post`, formData)
            .then(data => {
                pullMe();
                setModalVisible(!modalVisible);
                sendNotification(data.data);
                ToastAndroid.show("Event Added Successfully", ToastAndroid.LONG);
                navigation.goBack()
            }
            )
            .catch(err => {
                ToastAndroid.show("Event Adding Failed", ToastAndroid.LONG);
                console.log(err)
            })

    }

    return (

        <View style={{ flex: 1 }}>

            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}

                    onRequestClose={() => {
                        confirmModalClose()
                    }}>

                    <View style={styles.title}>
                        <Text style={styles.titleText}>Add completed event</Text>
                    </View>

                    <View style={{ ...styles.contai, backgroundColor: darkTheme ? "#282C35" : "white" }}>
                    </View>

                    <ScrollView>
                        <View style={{ ...styles.container, backgroundColor: darkTheme ? "#282C35" : "white" }} >

                            <View style={styles.container}>
                                <View style={styles.signupContainer}>


                                    <Formik
                                        initialValues={{

                                            event: '',
                                            location: '',
                                            gender: '',
                                            type: '',
                                            description: '',
                                            image: '',
                                            firstN: '',
                                            secondN: '',
                                            thirdN: '',
                                            firstT: '',
                                            secondT: '',
                                            thirdT: ''
                                        }}
                                        onSubmit={values => handleSubmit(values)}
                                        validationSchema={signUpValidationSchema}
                                    >
                                        {({ handleSubmit, isValid }) => (
                                            <>

                                                <Text style={styles.lable}  >Event Name *</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="event"
                                                    placeholder="Football"
                                                />
                                                <Text style={styles.lable}  >Type</Text>
                                                <SelectList
                                                    setSelected={(val) => setSelectedType(val)}
                                                    data={[
                                                        { key: '1', value: 'Single' },
                                                        { key: '2', value: 'Team' },
                                                    ]}
                                                    save="value"
                                                    boxStyles={styles.selectList}
                                                    search={false}
                                                    maxHeight={Dimensions.get('window').height * 0.13}
                                                    defaultOption={selectedType}
                                                    dropdownTextStyles={{ fontSize: Dimensions.get('window').width * 0.04 }}
                                                    inputStyles={{
                                                        fontSize: Dimensions.get('window').width * 0.05,
                                                    }}
                                                    placeholder="Single or Team"
                                                />

                                                <Text style={styles.lable}  >Gender</Text>
                                                <SelectList
                                                    setSelected={(val) => setSelectedGender(val)}
                                                    data={[
                                                        { key: '1', value: 'Men' },
                                                        { key: '2', value: 'Women' },
                                                        { key: '3', value: 'Men & Women' },
                                                    ]}
                                                    save="value"
                                                    boxStyles={styles.selectList}
                                                    search={false}
                                                    maxHeight={Dimensions.get('window').height * 0.2}
                                                    defaultOption={selectedGender}
                                                    dropdownTextStyles={{ fontSize: Dimensions.get('window').width * 0.04 }}
                                                    inputStyles={{
                                                        fontSize: Dimensions.get('window').width * 0.05,
                                                    }}
                                                    placeholder="Select Gender"
                                                />
                                                <Text style={styles.lable}  >Location</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="location"
                                                    placeholder="At the Main Stadium"
                                                    keyboardType="email-address"
                                                />



                                                <Text style={styles.lable}  >First Place</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="firstN"
                                                    placeholder=""
                                                    keyboardType="email-address"
                                                />

                                                <Text style={styles.lable}  >Second Place</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="secondN"
                                                    placeholder=""
                                                    keyboardType="email-address"
                                                />

                                                <Text style={styles.lable}  >Third Place</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="thirdN"
                                                    placeholder=""
                                                    keyboardType="email-address"
                                                />

                                                <Text style={styles.lable}  >First Team</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="firstT"
                                                    placeholder=""
                                                    keyboardType="email-address"
                                                />

                                                <Text style={styles.lable}  >Second Team</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="secondT"
                                                    placeholder=""
                                                    keyboardType="email-address"
                                                />

                                                <Text style={styles.lable}  >Third Team</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="thirdT"
                                                    placeholder=""
                                                    keyboardType="email-address"
                                                />

                                                <Text style={styles.lable}  >Description</Text>
                                                <Field
                                                    component={CustomInput}
                                                    name="description"

                                                    placeholder="Write about Event.."
                                                    multiline
                                                    numberOfLines={3}
                                                />


                                                <Text style={styles.lable}  >Date</Text>
                                                <View style={styles.dateContainer}>
                                                    <Text style={styles.dateText}>{mydate.toDateString()}</Text>

                                                    <Text style={styles.dateText}  > {Moment(mytime).format('LT')}</Text>
                                                </View>


                                                <View style={styles.buttonContainer2}>

                                                    <TouchableOpacity
                                                        style={styles.button2}
                                                        onPress={displayDatepicker}

                                                    >
                                                        <Text style={styles.buttonTextStyle}>Select Date</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={displayTimepicker}
                                                        style={styles.button2}
                                                    >
                                                        <Text style={styles.buttonTextStyle}>Select Time</Text>
                                                    </TouchableOpacity>


                                                </View>

                                                {isDisplayDate && (
                                                    <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={mydate}
                                                        mode={displaymode}
                                                        is24Hour={true}
                                                        display="default"
                                                        onChange={changeSelectedDate}
                                                    />
                                                )}

                                                {isDisplayTime && (
                                                    <DateTimePicker

                                                        testID="dateTimePicker"
                                                        value={mytime}
                                                        mode={displaymode1}
                                                        is24Hour={true}
                                                        display="default"
                                                        onChange={changeSelectedTime}
                                                    />
                                                )}



                                                <View style={styles.mainBody}>

                                                    <View style={{ height: 10, backgroundColor: 'white' }}>
                                                        <Animated.View style={{ height: 10, backgroundColor: '#307ecc', width }} />
                                                    </View>



                                                    <View style={styles.imageContainer}>
                                                        <Image

                                                            source={
                                                                photoShow !== null
                                                                    ? { uri: photoShow }
                                                                    : darkTheme
                                                                        ? require('../../Components/completedB.jpg')
                                                                        : require('../../Components/completedW.jpg')
                                                            }


                                                            style={{ width: '100%', height: '100%' }}
                                                        />
                                                    </View>


                                                    <View style={{ height: 10, backgroundColor: 'white' }}>
                                                        <Animated.View style={{ height: 10, backgroundColor: '#307ecc', width }} />
                                                    </View>


                                                    <View style={styles.buttonContainer}>
                                                        <TouchableOpacity
                                                            style={styles.buttonStyle}
                                                            activeOpacity={0.5}
                                                            disabled={isUploading}
                                                            onPress={takePhotoAndUpload}
                                                        >
                                                            <Text style={styles.buttonTextStyle}>Upload Image</Text>
                                                        </TouchableOpacity>


                                                        <TouchableOpacity
                                                            style={styles.buttonStyle}
                                                            activeOpacity={0.5}
                                                            onPress={dicardImage}
                                                        >
                                                            <Text style={styles.buttonTextStyle}>Discard Image</Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>


                
                                                <TouchableOpacity
                                                    onPress={handleSubmit}
                                                    disabled={!isValid || isUploading}
                                                    style={[
                                                        styles.addeventbutton,
                                                        { backgroundColor: isValid && !isUploading ? '#0b65bf' : 'gray' },
                                                    ]}
                                                >
                                                    <Text style={styles.addeventbuttonText}>Create</Text>
                                                </TouchableOpacity>



                                            </>
                                        )}
                                    </Formik>

                                </View>
                            </View>


                        </View>

                        <View style={{ ...styles.contai, backgroundColor: darkTheme ? "#282C35" : "white" }}>
                        </View>


                    </ScrollView>




                </Modal>

            </View>

        </View>
    );
}

export default NewCompleteEvent;


const styles = StyleSheet.create({

    contai: {
        padding: 5,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    signupContainer: {
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#4682B4'

    },
    title: {
        backgroundColor: '#4682B4',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },

    titleText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },

    lable: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d6d6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

    },

    buttonStyle: {
        backgroundColor: '#0b65bf',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },

    mainBody: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 150,
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').width * 0.85 * 3 / 4,

    },

    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    button2: {
        backgroundColor: '#0b65bf',
        padding: 2,
        borderRadius: 10,
        marginHorizontal: 10,
        width: Dimensions.get('window').width * 0.4,
        alignItems: 'center',
    },

    dateContainer: {

        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        elevation: 10,
        shadowColor: '#E67E22',
        elevation: 8,
        flexDirection: 'row',

    },

    dateText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        marginLeft: 10,
    },

    buttonContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
    },

    selectList: {
        width: Dimensions.get('window').width * 0.5,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        textAlignVertical: 'top',
        textAlign: 'center',
        fontSize: 20,
    },

    addeventbutton: {
        color: '#fff',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      addeventbuttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignItems: 'center',
      }

});