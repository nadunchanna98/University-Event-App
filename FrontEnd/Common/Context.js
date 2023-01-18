import { createContext, useState } from "react";
import BASE_URL from './BaseURL';
import axios from 'axios';

export const NewContext = createContext();

const Context = ({ children }) => {

    const [index, setIndex] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [marks, setMarks] = useState([]);   // total marks
    const [post, setPost] = useState([]);   //for the summary
    const [newPost, setNewPost] = useState([]);  //for the upcoming events
    const [date, setDate] = useState();
    const [event, setEvent] = useState("");

    //refresh
    const pullMe = () => {

        setRefresh(true);
        fetchMarks();
        fetchDate();
        getPost();
        getNewPost();

        setTimeout(() => {
          setRefresh(false);
        }, 4000);
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
                setDate(res.data[0].date);
                setEvent(res.data[0].event);
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
        axios.get(`${BASE_URL}posts`)
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

                index,
                setIndex,
                fetchMarks,
                marks,
                refresh,
                pullMe,
                date,
                setDate,
                event,
                fetchDate,
                getPost,
                post,
                getNewPost,
                newPost,

            }}>

            {children}

        </NewContext.Provider>
    )
};

export default Context;