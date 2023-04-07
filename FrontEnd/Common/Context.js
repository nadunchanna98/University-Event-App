import { createContext, useState } from "react";
import { ToastAndroid} from 'react-native'
import BASE_URL from './BaseURL';
import axios from 'axios';


export const NewContext = createContext();

const Context = ({ children }) => {

  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [marks, setMarks] = useState([]);   // total marks
  const [post, setPost] = useState([]);   //for the summary
  const [newPost, setNewPost] = useState([]);  //for the upcoming events
  const [date, setDate] = useState();  //for the latest updated date
  const [darkTheme, setDarkTheme] = useState(true);
  const [tokens, setTokens] = useState([]);
  const [userToken, setUserToken] = useState("");

  const getTheme = () => {
    axios.get(`${BASE_URL}users/user/${userToken}`)
      .then(res => {
        console.log("get theme function ",res.data.theme);

        setDarkTheme(res.data.theme);
      })
      .catch(err => {
        console.log(err);
      })

  }


  const getTokens = () => {
    axios.get(`${BASE_URL}users/token`)
      .then(res => {
        setTokens(res.data.map(item => item.token));
        // console.log("tokens--", tokens);
      })
      .catch(err => {
        console.log(err);
      })
    return () => {
      setTokens([]);
    }
  }

  //refresh
  const pullMe = () => {

    setRefresh(true);
    fetchMarks();
    fetchDate();
    getPost();
    getNewPost();
    // getTheme();

    setTimeout(() => {
      setRefresh(false);
    }, 4000);
  }


  const DeletePost = (id) => {

    console.log(id);
    axios.delete(`${BASE_URL}futureevents/delete/${id}`)
      .then(res => {
        console.log("success");
        ToastAndroid.show("Event Deleted Successfully", ToastAndroid.LONG);
        getNewPost();
      })
      .catch(err => {
        ToastAndroid.show("Event Not Deleted!!", ToastAndroid.LONG);
        console.log(err);
      })
  }


  //for marks
  const fetchMarks = () => {

    axios.get(`${BASE_URL}teams/total`)
      .then(res => {
        setMarks(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    return () => {
      setMarks([]);
    }

  }

  //for latest date
  const fetchDate = () => {

    axios.get(`${BASE_URL}latest/`)
      .then(res => {
        setDate(res.data.latestUpdate);
        // console.log(res.data.latestUpdate);
  
      })
      .catch(err => {
        console.log(err);                  //clean up function
      })
    return () => {
      setDate();
    }

  }

  //for summary
  const getPost = () => {
    axios.get(`${BASE_URL}pastevents`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.log(err);                  //clean up function
      })
    return () => {
      setPost([]);
    }

  }

  //for upcoming events
  const getNewPost = () => {
    axios.get(`${BASE_URL}futureevents`)
      .then(res => {
        setNewPost(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    return () => {
      setNewPost([]);
    }
  }



  return (

    <NewContext.Provider value={
      {

        darkTheme,
        setDarkTheme,
        index,
        setIndex,
        fetchMarks,
        marks,
        refresh,
        pullMe,
        date,
        setDate,
        fetchDate,
        getPost,
        post,
        getNewPost,
        newPost,
        DeletePost,
        getTokens,
        tokens,
        userToken,
        setUserToken,
        getTheme
 
      
      }}>

      {children}

    </NewContext.Provider>
  )
};

export default Context;