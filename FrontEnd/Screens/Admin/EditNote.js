import React, { useState, useContext, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Modal,
  Alert,
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


const AddNote = ({ route }) => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigation = useNavigation();
  const id = route.params.ID;


  const { fetchNotes, darkTheme } = useContext(NewContext);

  useEffect(() => {
    getNote();
  }, [])

  const getNote = () => {
    axios.get(`${BASE_URL}notes/note/${id}`)
      .then(res => {

        // console.log("res--", res.data.data);
        
      setTitle(res.data.data.title);
      setBody(res.data.data.body);

      })
      .catch(err => {
        console.log("err--", err);
      })
  }

  const confirmModalClose = () => {
    Alert.alert(
      "Discard Edit ?",
      "Are you sure you want to discard Edit ?",
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


  const handleSubmit = async () => {

    const formData = {
      // title: title,
      body: body,
      date: new Date()
    }


    axios.put(`${BASE_URL}notes/note/${id}`, formData)

      .then(data => {
        // console.log("data--", data);
        ToastAndroid.show("Note is updated", ToastAndroid.SHORT);
        fetchNotes();

        navigation.goBack();
      })
      .catch(err => {
        console.log("err--", err);
      })

  }


  const signUpValidationSchema = yup.object().shape({

    title: yup
      .string(),
    body: yup
      .string(),
      
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
                      value={title}
                      multiline={true}
                      numberOfLines={2}
                      onChangeText={(text) => setTitle(text)}
                    /> */}


                    <Text style={styles.lable}  >Body *</Text>

                    <Field
                      component={CustomInput}
                      name="body"
                      value={body}
                      multiline={true}
                      numberOfLines={8}
                      onChangeText={(text) => setBody(text)}
                    />



                    <Button
                      onPress={handleSubmit}
                      title="Edit Note"
                      disabled={!isValid}
                    />
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
})
