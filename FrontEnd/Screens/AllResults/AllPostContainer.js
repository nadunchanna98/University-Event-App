import React, {useEffect , useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NewContext } from '../../Common/Context';

const AllPostContainer = () => {

  const { post ,refresh ,pullMe ,getPost  } = useContext(NewContext);


  useEffect(() => { getPost();}, []);


  return (

    <View style={styles.AllPostContainer} >


      <FlatList

        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullMe()}
          />
        }


        data={post}
        renderItem={({ item }) =>

          <View style={styles.post}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.event}>{item.event} {item.gender}  {item.type}</Text>
            <Text style={styles.firstN}><FontAwesome5 name="medal" size={20} color="gold" />  {item.firstN} {item.firstT}</Text>
            <Text style={styles.secondN}><FontAwesome5 name="medal" size={20} color="#B2B2B2" />  {item.secondN} {item.secondT}</Text>
            <Text style={styles.thirdN}><FontAwesome5 name="medal" size={20} color="#CD7F32" />  {item.thirdN} {item.thirdT}</Text>
            {/* <Text style={styles.date}>{Moment(item.date).format('LLLL')}</Text> */}
            <Text style={styles.date}>{item.description}</Text>
          </View>
        }
        keyExtractor={item => item._id}
      />



    </View>

  )
}

export default AllPostContainer


const styles = StyleSheet.create({

  post: {
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
    borderColor: '#FF1E1E',
    padding: Dimensions.get('window').width * 0.05,
  },

  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.33,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
  },


  AllPostContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.9,
    backgroundColor: '#F9F9F9',
  },

  event: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10

  },

  firstN: {
    textTransform: 'capitalize',
    fontSize: 17,
    padding: 3,
    fontWeight: "700",
    marginBottom: 5
  },

  secondN: {
    textTransform: 'capitalize',
    fontSize: 17,
    padding: 3,
    fontWeight: "700",
    marginBottom: 5
  },

  thirdN: {
    textTransform: 'capitalize',
    fontSize: 17,
    padding: 3,
    fontWeight: "700",
    marginBottom: 13
  },

  date: {
    padding: 3,
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center"
  },

  description: {
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 5
  },





})