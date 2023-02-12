import React, { useState, useContext, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal,
    ScrollView
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import * as ImagePicker from "react-native-image-picker"
import DateTimePicker from '@react-native-community/datetimepicker';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NewContext } from '../../Common/Context';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";


const EditSummeryEvent = ({ route }) => {

    const { pullMe , darkTheme } = useContext(NewContext);

    const navigation = useNavigation();
    const ID = route.params.ID;

    const [firstN , setFirstN] = useState('');
    const [secondN , setSecondN] = useState('');
    const [thirdN , setThirdN] = useState('');
    const [firstT , setFirstT] = useState('');
    const [secondT , setSecondT] = useState('');
    const [thirdT , setThirdT] = useState('');
    const [event, setEvent] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');

    // console.log(selectedEvent)

    const getEvent = () => {
        axios.get(`${BASE_URL}pastevents/${ID}`)
            .then(res => {

                setEvent(res.data.event);
                setDate(res.data.date);
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
                { text: "OK", onPress: () =>  navigation.goBack()}
            ],
            { cancelable: false }
        );
    };


    const handleSubmit = (e) => {

        const formData = {
            event: event,
            date: date,
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

        }

        // console.log(formData)
        // console.log(ID)

        axios.put(`${BASE_URL}pastevents/update/${ID}`, formData)
            .then(data => {
                console.log(" successfull update")
                pullMe();
                navigation.goBack();
            }
            )
            .catch(err => console.log(err))
    }

    // const [mydate, setDate] = useState(new Date());
    // const [displaymode, setMode] = useState('date');
    // const [isDisplayDate, setShow] = useState(false);
    // const changeSelectedDate = (event, selectedDate) => {
    //   const currentDate = selectedDate || mydate;
    //   setDate(currentDate);
    // };

    // const showMode = (currentMode) => {
    //   setShow(true);
    //   setMode(currentMode);

    // };

    // const displayDatepicker = () => {
    //   showMode('date');
    // };

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
        // photo: yup.object().required('Photo is required'),
    })


    return (
        <View style={{flex: 1}}>
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

            <View style={{...styles.contai , backgroundColor: darkTheme ? "#282C35" : "white" }}> 
                </View>

            <ScrollView>
            <View style={{...styles.container , backgroundColor: darkTheme ? "#282C35" : "white" }}    >
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
                            date: '',
                            description: '',
                            setFieldValue: '',
                            setFieldTouched: '',
                            errors: '',
                            touched: '',
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
                                    onChangeText= {(text) => setEvent(text)}
                                />
                                <Text style={styles.lable}  >Type</Text>
                                <Field
                                    component={CustomInput}
                                    name="type"
                                    value={type}
                                    onChangeText= {(text) => setType(text)}
                                />

                                <Text style={styles.lable}  >Gender</Text>
                                <Field
                                    component={CustomInput}
                                    name="gender"
                                    value={gender}
                                    onChangeText= {(text) => setGender(text)}
                                />

                                <Text style={styles.lable}  >First Name</Text>
                                <Field
                                    component={CustomInput}
                                    name="firstN"
                                    value={firstN}
                                    onChangeText= {(text) => setFirstN(text)}
                                />

                                <Text style={styles.lable}  >Second Name</Text>
                                <Field

                                    component={CustomInput}
                                    name="secondN"
                                    value={secondN}
                                    onChangeText= {(text) => setSecondN(text)}
                                />

                                <Text style={styles.lable}  >Third Name</Text>
                                <Field
                                    component={CustomInput}
                                    name="thirdN"
                                    value={thirdN}
                                    onChangeText= {(text) => setThirdN(text)}
                                />

                                <Text style={styles.lable}  >First Team</Text>
                                <Field

                                    component={CustomInput}
                                    name="firstT"
                                    value={firstT}
                                    onChangeText= {(text) => setFirstT(text)}
                                />

                                <Text style={styles.lable}  >Second Team</Text>
                                <Field
                                    component={CustomInput}
                                    name="secondT"
                                    value={secondT}
                                    onChangeText= {(text) => setSecondT(text)}
                                />

                                <Text style={styles.lable}  >Third Team</Text>
                                <Field

                                    component={CustomInput}
                                    name="thirdT"
                                    value={thirdT}
                                    onChangeText= {(text) => setThirdT(text)}
                                />




                                <Text style={styles.lable}  >Location</Text>
                                <Field
                                    component={CustomInput}
                                    name="location"
                                    value={location}
                                    onChangeText= {(text) => setLocation(text)}
                                    keyboardType="email-address"
                                />

                                <Text style={styles.lable}  >Description</Text>
                                <Field
                                    component={CustomInput}
                                    name="description"
                                    value={description}
                                    onChangeText= {(text) => setDescription(text)}
                                    multiline
                                    numberOfLines={3}
                                />

                                <Text style={styles.lable}  >Date</Text>
                                <Field
                                    component={CustomInput}
                                    name="date"
                                    value={moment.utc(date).format('YYYY/MM/DD - hh:mm a')}
                                    onChangeText= {(text) => setDate(text)}
                                />

                                {/* <View>
                  <Button onPress={displayDatepicker} title="Show date picker!" />
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
                )} */}

                                {/* <TouchableOpacity
                  style={styles.photoButton}
                  onPress={() => {
                    ImagePicker.showImagePicker(options, (response) => {
                      if (response.uri) {
                        let data = {
                          name: response.fileName,
                          type: response.type,
                          uri:
                            Platform.OS === 'android'
                            ? response.uri
                            : response.uri.replace('file://', ''),
                        };
                        formProps.setFieldValue('image1', data);
                      }
                    });
                  }}
                >
                  <Text>Add Image</Text>
                </TouchableOpacity> */}


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

            <View style={{...styles.contai , backgroundColor: darkTheme ? "#282C35" : "white" }}> 
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
})
export default EditSummeryEvent;