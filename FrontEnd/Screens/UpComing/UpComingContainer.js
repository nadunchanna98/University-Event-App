import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TextInput, RefreshControl, Button, Alert, Modal, Pressable } from 'react-native'
import Moment from 'moment';
import { NewContext } from '../../Common/Context';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import ShareEvent from '../Admin/ShareEvent';

import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from '../Admin/CustomInput'

const UpComingContainer = ({ navigation }) => {

  const { newPost, refresh, pullMe, getNewPost } = useContext(NewContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (values) => {

    setModalVisible(false);

    const formData = {

      firstN: values.firstN,
      secondN: values.secondN,
      thirdN: values.thirdN,
      firstT: values.firstT,
      secondT: values.secondT,
      thirdT: values.thirdT,
      event: values.event,
      date: "2027-12-12 19:10:00",
      description: values.description,
      type: values.type,
      gender: values.gender,

    }

    axios.post(`${BASE_URL}pastevents/post`, formData)
      .then(data => {
        console.log(" success ")
        pullMe();
        setModalVisible(!modalVisible);
      }
      )
      .catch(err => console.log(err))

  }


  const SharePost = (item) => {
    navigate('/ShareEvent', { state: item });
  }

  const DeletePost = (id) => {

    console.log(id);
    axios.delete(`${BASE_URL}futureevents/delete/${id}`)
      .then(res => {
        console.log("success");
        getNewPost();
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => { getNewPost(); }, []);

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

    <View style={styles.AllPostContainer}  >

      <FlatList

        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullMe()}
          />

        }

        data={newPost}
        renderItem={({ item ,  index}) =>

          <View style={styles.post}>

            <Image style={styles.image} source={item.image ? { uri: item.image } : { uri: 'https://m.marketplacepin.com/images/no-photos.png' }} />
            <Text style={styles.event}>{item.event} {item.gender}  {item.type}</Text>
            <Text style={styles.date}  > {Moment(item.date).format('LLLL')} </Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.date}>{item.location}</Text>


            <View style={styles.buttonpanel} >

              <View style={styles.buttons} >


                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
    
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>


                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Share {item.event} </Text>


                        <View style={styles.container}>
                          <View style={styles.signupContainer}>

                            <Formik
                              initialValues={{
                                event: item.event,
                                location: item.location,
                                gender: item.gender,
                                type: item.type,
                                date: item.date,
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
                                    numberOfLines={3}
                                  />

                                  <Button
                                    style={[styles.buttons, styles.buttonClose]}
                                    onPress={() => handleSubmit }
                                    disabled={!isValid}
                                    title="Share"
                                   />
                                </>
                              )}
                            </Formik>

                          </View>
                        </View>











                      </View>
                    </View>


                  </Modal>



                  <Button
                    style={[styles.buttons, styles.buttonOpen]}
                    currentItemId={item}
                    onPress={(index) => setModalVisible(true)}
                    title="Share Event"
                  />
                </View>






              </View>
              <View style={styles.buttons} >
                <Button title="Delete " color='red' onPress={() => DeletePost(item._id)} />
              </View>
            </View>

          </View>
        }
        keyExtractor={item => item._id}
      />




    </View>
  )
}

export default UpComingContainer


const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  AllPostContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.9,
    backgroundColor: '#F9F9F9',
  },

  event: {
    textTransform: 'capitalize',
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: 'center',

  },


  date: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
    textAlign: 'center',
  },

  description: {
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5
  },

  post: {
    //backgroundColorImage: backgroundImage,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#3d6ecf',
    padding: Dimensions.get('window').width * 0.05,
  },

  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.33,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
  },

  buttonpanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.7,

  },

  buttons: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.05,
    margin: 10,
  },


})