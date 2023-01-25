import React, { useState, useContext, useEffect, } from 'react';
import { Alert, Modal, StyleSheet, Text, StatusBar, Dimensions, View, TextInput, Button, ScrollView } from 'react-native'
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import { useNavigation } from '@react-navigation/native';

const ShareEvent = ({ route }) => {

  const { pullMe, DeletePost } = useContext(NewContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const ID = route.params.ID;
  // console.log(ID)

  const [selectedEvent, setSelectedEvent] = useState('');

  // console.log(selectedEvent)

  const getEvent = () => {
    axios.get(`${BASE_URL}futureevents/${ID}`)
      .then(res => {
        // console.log(res.data);
        setSelectedEvent(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {

    getEvent(ID);
    setModalVisible(true);
  }, []);


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

    }

    // console.log(formData)

    axios.post(`${BASE_URL}pastevents/post`, formData)
      .then(data => {
        pullMe();
        setModalVisible(!modalVisible);
        DeletePost(ID)
        navigation.goBack()
      }
      )
      .catch(err => console.log(err))

  }

  const signUpValidationSchema = yup.object().shape({
    firstN: yup
      .string()
      .required('First place is required'),
    secondN: yup
      .string()
      .required('Second place is required'),
    thirdN: yup
      .string()
      .required('Third place is required'),
    description: yup
      .string()
      .min(0, ({ min, value }) => `${min - value.length} characters to go`),
    // photo: yup.object().required('Photo is required'),
  })


  return (

    <View style={{flex: 1}}>
    
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
          <ScrollView>
          <View style={styles.container}>

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
                        numberOfLines={2}
                      />

                      <Button
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleSubmit}
                        disabled={!isValid}
                        title="Share"
                      />
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

          </ScrollView>
        </Modal>
        
      </View>
   
    </View>
  );
}

export default ShareEvent


const styles = StyleSheet.create({

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

});