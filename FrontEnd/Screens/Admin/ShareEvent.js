import React, { useState, useContext, useEffect, useRef } from 'react';
import { Animated, Alert, Modal, StyleSheet, TouchableOpacity, Text, Image, Dimensions, View, Button, ScrollView, ToastAndroid } from 'react-native'
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../src/config'  // for image upload for firebase
import * as ImagePicker from 'expo-image-picker'
import NotificationServer2 from '../../NotificationServer2'   // for notification for firebase

const ShareEvent = ({ route }) => {

  const { pullMe, darkTheme, getTokens, tokens } = useContext(NewContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const DeletePostByAuto = (id) => {

    console.log(id);
    axios.delete(`${BASE_URL}futureevents/delete/${id}`)
      .then(res => {
        // console.log("success");
        getNewPost();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const ID = route.params.ID;
  // console.log(ID)

  const [selectedEvent, setSelectedEvent] = useState('');
  const [description, setDescription] = useState('');
  const [photoShow, setPhotoShow] = React.useState(null);
  const [imagef, setImagef] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageexist, setImageExist] = useState(false);


  // console.log(selectedEvent)

  const getEvent = () => {
    axios.get(`${BASE_URL}futureevents/${ID}`)
      .then(res => {
        // console.log(res.data);
        setSelectedEvent(res.data);
        setDescription(res.data.description)
        setPhotoShow(res.data.image)
        setImagef(res.data.image)
        setImageExist(res.data.image)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {

    getEvent(ID);
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

    // console.log("data2--", data);
    // console.log("tokens--", tokens);


    let notificationData = {
      title: `Check out the winners of ${data.event}!`,
      body: ` 🥇 Top spot: ${data.firstN}\n 🥈 Second spot: ${data.secondN}\n 🥉 Third spot: ${data.thirdN}`,
      token: tokens
    }

    // console.log("notificationData--", notificationData);

    await NotificationServer2.sendMultipleNotification(notificationData);

  };


  const confirmModalClose = () => {
    Alert.alert(
      "Stop Share ?",
      "Are you sure you want to discard sharing ?",
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


  const handleSubmit = (values) => {


    const formData = {

      firstN: values.firstN,
      secondN: values.secondN,
      thirdN: values.thirdN,
      firstT: values.firstT,
      secondT: values.secondT,
      thirdT: values.thirdT,
      event: selectedEvent.event,
      location: selectedEvent.location,
      gender: selectedEvent.gender,
      type: selectedEvent.type,
      date: selectedEvent.date,
      time: selectedEvent.time,
      image: imagef,
      description: description,

    }

    // console.log(formData)

    axios.post(`${BASE_URL}pastevents/post`, formData)
      .then(data => {

        setModalVisible(!modalVisible);
        DeletePostByAuto(ID)
        sendNotification(data.data);
        ToastAndroid.show("Event Shared Successfully", ToastAndroid.LONG);
        pullMe();
        navigation.goBack()
      }
      )
      .catch(err => {
        ToastAndroid.show("Event Sharing Failed", ToastAndroid.LONG);
        console.log(err)
      })

  }

  const signUpValidationSchema = yup.object().shape({
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
    // setPhotoShow(source.uri);

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
    setPhotoShow(imageexist);
    setImagef(imageexist);
    setIsUploading(false);
    setUploading(false);
    setProgress(0);

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
            <Text style={styles.titleText}>Share {selectedEvent.event}</Text>
          </View>

          <View style={{ ...styles.contai, backgroundColor: darkTheme ? "#282C35" : "white" }}>
          </View>

          <ScrollView>
            <View style={{ ...styles.container, backgroundColor: darkTheme ? "#282C35" : "white" }} >

              <View style={styles.container}>
                <View style={styles.signupContainer}>


                  <Formik
                    initialValues={{

                      description: '',
                      firstN: '',
                      secondN: '',
                      thirdN: '',
                      firstT: '',
                      secondT: '',
                      thirdT: '',
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={signUpValidationSchema}
                  >
                    {({ handleSubmit, isValid }) => (
                      <>

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
                          value={description}
                          onChangeText={(text) => setDescription(text)}
                          multiline
                          numberOfLines={3}
                        />

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
                          
                          style={[
                            styles.addeventbutton,
                            { backgroundColor: '#0b65bf'  },
                          ]}
                        >
                          <Text style={styles.addeventbuttonText}>Share</Text>
                        </TouchableOpacity>

                      </>
                    )}
                  </Formik>

                </View>
              </View>

              {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)} >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}


            </View>

            <View style={{ ...styles.contai, backgroundColor: darkTheme ? "#282C35" : "white" }}>
            </View>


          </ScrollView>




        </Modal>

      </View>

    </View>
  );
}

export default ShareEvent


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