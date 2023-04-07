import React, { useState, useContext, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal,
    ScrollView,
    ToastAndroid
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NewContext } from '../../Common/Context';
import { useNavigation } from '@react-navigation/native';
import Moment from "moment";
import { firebase } from '../../src/config'  // for image upload for firebase
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';


const EditSummeryEvent = ({ route }) => {

    const { pullMe, darkTheme } = useContext(NewContext);

    const navigation = useNavigation();
    const ID = route.params.ID;

    const [firstN, setFirstN] = useState('');
    const [secondN, setSecondN] = useState('');
    const [thirdN, setThirdN] = useState('');
    const [firstT, setFirstT] = useState('');
    const [secondT, setSecondT] = useState('');
    const [thirdT, setThirdT] = useState('');
    const [event, setEvent] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [photoShow, setPhotoShow] = React.useState(null);
    const [imagef, setImagef] = useState(null);
    const [uploading, setUploading] = useState(false);



    // console.log(selectedEvent)

    const getEvent = () => {
        axios.get(`${BASE_URL}pastevents/${ID}`)
            .then(res => {

                const  date  = res.data.date;

                setEvent(res.data.event);
                setMyDate(Moment(date, 'YYYY-MM-DD').toDate());
                setMyTime(Moment(date, 'hh:mm').toDate());
                setDescription(res.data.description);
                setType(res.data.type);
                setGender(res.data.gender);
                setLocation(res.data.location);
                setFirstN(res.data.firstN);
                setSecondN(res.data.secondN);
                setThirdN(res.data.thirdN);
                setFirstT(res.data.firstT);
                setSecondT(res.data.secondT);
                setThirdT(res.data.thirdT);
                setPhotoShow(res.data.image);

            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getEvent(ID);
    }, []);



    const confirmModalClose = () => {
        Alert.alert(
            "Discard Changes?",
            "Are you sure you want to discard changes?",
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


    const handleSubmit = (e) => {

        const formData = {
            event: event,

            date: Moment(mydate).format('YYYY-MM-DD'),
            time: mytime,
            
            description: description,
            type: type,
            gender: gender,
            location: location,
            firstN: firstN,
            secondN: secondN,
            thirdN: thirdN,
            firstT: firstT,
            secondT: secondT,
            thirdT: thirdT,
            image: imagef

        }

        // console.log(formData)
        // console.log(ID)

        axios.put(`${BASE_URL}pastevents/update/${ID}`, formData)
            .then(data => {
                console.log(" successfull update")
                ToastAndroid.show("Event Updated Successfully", ToastAndroid.LONG);
                pullMe();
                navigation.goBack();
            }
            )
            .catch(err => {
                ToastAndroid.show("Event Update Failed!!", ToastAndroid.LONG);
                console.log(err)
            })
    }


    const signUpValidationSchema = yup.object().shape({
        event: yup
            .string(),
        location: yup
            .string(),
        gender: yup
            .string(),
        description: yup
            .string()
            .min(0, ({ min, value }) => `${min - value.length} characters to go`),
        
    })


    const takePhotoAndUpload = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        const source = { uri: result.uri };

        setImagef(source);

        // console.log("source--", source);
        // console.log("imagef--", imagef);

        uploadImage(source.uri);
        setPhotoShow(source.uri);

    }

    //firebase image upload
    const uploadImage = async (uri) => {

        // console.log("im from uploadimage--", uri);

        setUploading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;
        } catch (e) {
            console.log(e);
        }

        const abc = await ref.snapshot.ref.getDownloadURL();
        console.log("url--", abc);
        setImagef(abc);


    };

    const dicardImage = () => {
        setPhotoShow(null);
        setImagef(null);
    }


    //date picker

    const [displaymode, setDisplayMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
    const [mydate, setMyDate] = useState(new Date());



    const changeSelectedDate = (event, selectedDate) => {

        const currentDate = selectedDate || mydate;
        setMyDate(currentDate);
        console.log(currentDate);
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
    const [mytime, setMyTime] = useState(new Date().getTime());
    const [displaymode1, setDisplayMode1] = useState('time');
    const [isDisplayTime, setShow1] = useState(false);

    const changeSelectedTime = (event, selectedTime) => {

        const currentTime = selectedTime || mytime;
        console.log(currentTime);
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




    return (
        <View style={{ flex: 1 }}>
            <Modal visible={true}
                animationType="slide"

                onRequestClose={() => {
                    confirmModalClose();
                }
                }
            >

                <View style={styles.title}>
                    <Text style={styles.titleText}>Edit Event Summary</Text>
                </View>

                <View style={{ ...styles.contai, backgroundColor: darkTheme ? "#282C35" : "white" }}>
                </View>

                <ScrollView>
                    <View style={{ ...styles.container, backgroundColor: darkTheme ? "#282C35" : "white" }}    >
                        <View style={styles.signupContainer}>

                            <Formik
                                initialValues={{
                                    firstN: '',
                                    secondN: '',
                                    thirdN: '',
                                    firstT: '',
                                    secondT: '',
                                    thirdT: '',
                                    event: event,
                                    location: '',
                                    gender: '',
                                    type: '',
                                    description: '',
      
                                }}
                                onSubmit={values => handleSubmit(values)}
                                validationSchema={signUpValidationSchema}
                            >
                                {({ handleSubmit, isValid }) => (
                                    <>
                                        <Text style={styles.lable}  >Event Name</Text>
                                        <Field
                                            component={CustomInput}
                                            name="event"
                                            value={event}
                                            onChangeText={(text) => setEvent(text)}
                                        />
                                        <Text style={styles.lable}  >Type</Text>
                                        <Field
                                            component={CustomInput}
                                            name="type"
                                            value={type}
                                            onChangeText={(text) => setType(text)}
                                        />

                                        <Text style={styles.lable}  >Gender</Text>
                                        <Field
                                            component={CustomInput}
                                            name="gender"
                                            value={gender}
                                            onChangeText={(text) => setGender(text)}
                                        />

                                        <Text style={styles.lable}  >First Name</Text>
                                        <Field
                                            component={CustomInput}
                                            name="firstN"
                                            value={firstN}
                                            onChangeText={(text) => setFirstN(text)}
                                        />

                                        <Text style={styles.lable}  >Second Name</Text>
                                        <Field

                                            component={CustomInput}
                                            name="secondN"
                                            value={secondN}
                                            onChangeText={(text) => setSecondN(text)}
                                        />

                                        <Text style={styles.lable}  >Third Name</Text>
                                        <Field
                                            component={CustomInput}
                                            name="thirdN"
                                            value={thirdN}
                                            onChangeText={(text) => setThirdN(text)}
                                        />

                                        <Text style={styles.lable}  >First Team</Text>
                                        <Field

                                            component={CustomInput}
                                            name="firstT"
                                            value={firstT}
                                            onChangeText={(text) => setFirstT(text)}
                                        />

                                        <Text style={styles.lable}  >Second Team</Text>
                                        <Field
                                            component={CustomInput}
                                            name="secondT"
                                            value={secondT}
                                            onChangeText={(text) => setSecondT(text)}
                                        />

                                        <Text style={styles.lable}  >Third Team</Text>
                                        <Field

                                            component={CustomInput}
                                            name="thirdT"
                                            value={thirdT}
                                            onChangeText={(text) => setThirdT(text)}
                                        />




                                        <Text style={styles.lable}  >Location</Text>
                                        <Field
                                            component={CustomInput}
                                            name="location"
                                            value={location}
                                            onChangeText={(text) => setLocation(text)}
                                            keyboardType="email-address"
                                        />

                                        <Text style={styles.lable}  >Description</Text>
                                        <Field
                                            component={CustomInput}
                                            name="description"
                                            value={description}
                                            onChangeText={(text) => setDescription(text)}
                                            multiline
                                            numberOfLines={3}
                                        />

                                        <Text style={styles.lable}  >Date</Text>
                                        <View style={styles.dateContainer}>
                                            <Text style={styles.dateText}>{mydate.toDateString()}</Text>
                                            <Text style={styles.dateText}  >{Moment(mytime).format('LT')}</Text>

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

                                            {photoShow &&
                                                <View style={styles.imageContainer}>
                                                    <Image
                                                        source={{ uri: photoShow }}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </View>
                                            }


                                            <View style={styles.buttonContainer}>
                                                <TouchableOpacity
                                                    style={styles.buttonStyle}
                                                    activeOpacity={0.5}
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


                                        <Button
                                            onPress={handleSubmit}
                                            title="Save Changes"
                                            disabled={!isValid}
                                        />
                                    </>
                                )}
                            </Formik>

                        </View>
                    </View>

                    <View style={{ ...styles.contai, backgroundColor: darkTheme ? "#282C35" : "white" }}>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

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
    photoButton: {
        backgroundColor: '#04b040',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        shadowColor: '#E67E22',
        shadowOpacity: 0.8,
        elevation: 8

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
        backgroundColor: '#307ecc',
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

    buttonContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
    },

    button2: {
        backgroundColor: '#307ecc',
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


})
export default EditSummeryEvent;