import React,{ useState, useEffect,useContext } from "react";
import { Redirect } from 'react-router-dom';
import { Badge,Button } from "react-bootstrap";

import UserContext from '../UserContext';
import axiosInstance from "../axiosApi";


const SingleQuiz = () => {
  const initialQuesObj = {
    answer:0,
    explanation:"",
    id:0,
    ques_image:"",
    ques_text: ""
  }

  const [quesList,setQuesList] = useState([]);
  const [quesCount,setQuesCount] = useState(0);
  const [currentQues,setCurrentQues] = useState(initialQuesObj);

  const userLogValue = useContext(UserContext);
  
  useEffect(() => {
      if(!userLogValue.value) {
        // return <Redirect to='/login/' />;
      }
      const requestData = async ()=>{
        const response = await axiosInstance.get('/modes/list-sq/')
        setQuesList(response.data);
        setCurrentQues(response.data[quesCount]);
      }
      requestData();   
  },[]);

  const handleClick = ()=>{
      console.log(quesList);
      console.log(currentQues.explanation);
      console.log(currentQues);
  }

  return (
    <div style={{ backgroundColor: "aqua", height: "fit-content" }} className="container" >
      <div style={{ textAlign: "right" }}>
        <h1>
          <Badge style={{ width: "200px" }} variant="secondary">
            Timer-0:00
          </Badge>
        </h1>
        <h1>
          <Badge style={{ width: "200px" }} variant="secondary">
            Score-0
          </Badge>
        </h1>
      </div>

      <div style={{ textAlign: "center" }}>
        <img
          style={{
            border: "1px solid black",
            borderRadius: "4px",
            padding: "5px",
            width: "320px",
            marginTop: "30px",
          }}
          src=""
          alt=""
        ></img>
        <h1 id="img-title">1</h1>
      </div>

      <div style={{ textAlign: "center" }}>
        <Button onClick={handleClick} className="choicebtn" id="primarybtn" size="lg" variant="light">
          Primary
        </Button>
        <Button className="choicebtn" size="lg" variant="light">
          Secondary
        </Button>
        <Button className="choicebtn" size="lg" variant="light">
          Tertiary
        </Button>
      </div>

      <div style={{ marginTop: "5%" }}>
        <h1>Explanation</h1>
        <p>{currentQues.explanation}</p>
      </div>
    </div>
  )
}

export default SingleQuiz


