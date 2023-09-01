import React, { useContext, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Modal,
  Alert,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NewContext } from '../../Common/Context';
import { useNavigation } from '@react-navigation/native';
import NotificationServer2 from '../../NotificationServer2'   // for notification for firebase


const AddNote = () => {

  const navigation = useNavigation();
  const { getTokens, tokens, darkTheme, fetchNotes } = useContext(NewContext);

  useEffect(() => {
    getTokens();
  }, [])


  const sendNotification = async (data) => {

    // console.log("data--", data);

    let notificationData = {
      title: "Special Notice ",
      body: data.body,
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


  const handleSubmit = async (values) => {

    const formData = {
      // title : values.title,
      body: values.body,
    }


    axios.post(`${BASE_URL}notes/note`, formData)
      .then(data => {
        // console.log(" success ")
        ToastAndroid.show("Note Added Successfully", ToastAndroid.LONG);
        fetchNotes();
        sendNotification(data.data);
        navigation.goBack();
      }
      )
      .catch(err => {

        console.log("error--", err);
        ToastAndroid.show("Note not Added!!", ToastAndroid.LONG);
      }
      )

  }


  const signUpValidationSchema = yup.object().shape({

    title: yup
      .string(),
    body: yup
      .string()
      .required('Body is required'),

  })


  return (

    <View style={{ flex: 1 }}>

      <Modal
        visible={true}
        animationType="slide"
        onRequestClose={() => {
          confirmModalClose();
        }}
      >


        <View style={styles.title}>
          <Text style={styles.titleText}>Add new Note</Text>
        </View>

        <View style={{ ...styles.contai, backgroundColor: darkTheme ? "#282C35" : "white" }}>
        </View>


        <ScrollView>

          <View style={{ ...styles.container, backgroundColor: darkTheme ? "#282C35" : "white" }} >
            <View style={styles.signupContainer}>

              <Formik
                initialValues={{
                  title: '',
                  body: '',
                }}
                onSubmit={values => handleSubmit(values)}
                validationSchema={signUpValidationSchema}
              >
                {({ handleSubmit, isValid }) => (
                  <>
                    {/* <Text style={styles.lable}  >Subject</Text>
                    <Field
                      component={CustomInput}
                      name="title"
                      placeholder="Football practice time changed" 
                      multiline={true}
                      numberOfLines={2}
                    /> */}


                    <Text style={styles.lable}  >Body *</Text>

                    <Field
                      component={CustomInput}
                      name="body"

                      placeholder="Football practice time changed to 5:00 pm"
                      multiline={true}
                      numberOfLines={8}
                    />

                    <TouchableOpacity
                      onPress={handleSubmit}
                      disabled={!isValid }
                      style={[
                        styles.addeventbutton,
                        { backgroundColor: isValid  ? '#0b65bf' : 'gray' },
                      ]}
                    >
                      <Text style={styles.addeventbuttonText}>Add Note</Text>
                    </TouchableOpacity>

                  </>
                )}
              </Formik>



            </View>
          </View>
        </ScrollView>

      </Modal>

    </View>
  )
}


export default AddNote

const styles = StyleSheet.create({

  contai: {
    padding: 5,
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

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
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
    fontSize: 20,
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


  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },

  buttonpanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',

    alignItems: 'center',
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
})
