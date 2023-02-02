import React, { useState, useContext, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  ScrollView,
  Image
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import DateTimePicker from '@react-native-community/datetimepicker';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NewContext } from '../../Common/Context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Moment from 'moment';

//image upload for aws
import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);



const NewEvent = () => {

  const { pullMe } = useContext(NewContext);
  const navigation = useNavigation();

  const [photo, setPhoto] = React.useState(null);
  const [photoShow, setPhotoShow] = React.useState(null);


  const [localUri, setLocalUri] = useState();

  //upload image
  const fetchImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }

  const uploadFile = async (file) => {
    const img = await fetchImage(file.uri);
    return Storage.put(`my-image-filenames/${Math.random()}.jpg`, img, {
      level: 'public',
      contentType: file.type,
      progressCallback(uploadProgress) {
        // console.log("progress--", uploadProgress.loaded + ' / ' + uploadProgress.total);
      }
    })
      .then(result => {
        Storage.get(result.key)
          .then(data => {
            // console.log("Results--", data);

            let awsImageUri = data.substring(0, data.indexOf('?'));
            console.log("awsImageUri--", awsImageUri);
            setLocalUri(awsImageUri);
          }
          )
          .catch(err => console.log(err));

      })
      .catch(err => console.log(err));


  }




  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission denied!');
        }
      }
    })();
  }, []);


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

  const takePhotoAndUpload = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    uploadFile(result);


    let localUri1 = result.uri;
    setLocalUri(localUri1);
    setPhotoShow(localUri1);
  }




  const handleSubmit = (values) => {

    const formData = {
      event: values.event,
      date: Moment(mydate).format('YYYY-MM-DD'),
      time: mytime,
      description: values.description,
      type: values.type,
      gender: values.gender,
      image: localUri,
      location: values.location,
    }



    axios.post(`${BASE_URL}futureevents/post`, formData)
      .then(data => {
        console.log(" success ")
        pullMe();
        setPhoto(data.image);
        navigation.goBack();
      }
      )
      .catch(err => console.log(err))
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
    // photo: yup.object().required('Photo is required'),
  })

  const dicardImage = () => {
    setPhotoShow(null);
  }


  return (
    <>
      <Modal visible={true} animationType="slide"

        onRequestClose={() => {
          confirmModalClose();
        }}
      >
        <View style={styles.title}>
          <Text style={styles.titleText}>Create Event</Text>
        </View>


        <ScrollView>
          <View style={styles.container}>
            <View style={styles.signupContainer}>

              <Formik
                initialValues={{
                  event: '',
                  location: '',
                  gender: '',
                  type: '',
                  description: '',
                  image: ''
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
                      placeholder="Football"
                    />
                    <Text style={styles.lable}  >Type</Text>
                    <Field
                      component={CustomInput}
                      name="type"
                      placeholder="Team/Individual"
                    />

                    <Text style={styles.lable}  >Gender</Text>
                    <Field
                      component={CustomInput}
                      name="gender"
                      placeholder="Men"
                    />
                    <Text style={styles.lable}  >Location</Text>
                    <Field
                      component={CustomInput}
                      name="location"
                      placeholder="At the Main Stadium"
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
                      title="Add Event"
                      disabled={!isValid}
                    />
                  </>
                )}
              </Formik>

            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({

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

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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



  mainBody: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 150,
    width: Dimensions.get('window').width * 0.85,
    height: Dimensions.get('window').width * 0.85 * 3 / 4,

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
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },

  buttonpanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',

    alignItems: 'center',
  },
})
export default NewEvent