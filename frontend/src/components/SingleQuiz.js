import React, { useState, useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import { Badge, Button } from "react-bootstrap";

import UserContext from '../UserContext';
import axiosInstance from "../axiosApi";


const SingleQuiz = () => {
  const initialQuesObj = {
    answer: 0,
    explanation: "",
    id: 0,
    ques_image: "",
    ques_text: ""
  }
  const [score, setScore] = useState(0);
  const [quesList, setQuesList] = useState([]);
  const [quesCount, setQuesCount] = useState(0);
  const [currentQues, setCurrentQues] = useState(initialQuesObj);
  const [currentExplanation, setCurrentExplanation] = useState("Answer the Question to View Explanation!");

  const [primaryBtnStyle, setPrimaryStyle] = useState("light");
  const [secondaryBtnStyle, setSecondaryStyle] = useState("light");
  const [tertiaryBtnStyle, setTertiaryStyle] = useState("light");

  const userLogValue = useContext(UserContext);

  useEffect(() => {
    if (!userLogValue.value) {
      // return <Redirect to='/login/' />;
    }
    const requestData = async () => {
      const response = await axiosInstance.get('/modes/list-sq/')
      setQuesList(response.data);
      setCurrentQues(response.data[quesCount]);
    }
    requestData();
  }, []);

  const handleClick = async (event) => {
    // Submitting Answer to db and Updating Explanation
    let answerSelected = event.target.name;
    const response = await axiosInstance.post('/modes/answer-sq/', {
      'questionID': currentQues.id,
      'answer': answerSelected,
    })
    if (answerSelected == currentQues.answer) {
      if (answerSelected == 1) {
        setPrimaryStyle("success");
      }
      else if (answerSelected == 2) {
        setSecondaryStyle("success");
      }
      else if (answerSelected == 3) {
        setTertiaryStyle("success");
      }
      setScore((prevScore) => prevScore + 10);
    }
    else {
      setScore((prevScore) => prevScore - 5);
      if (currentQues.answer == 1) {
        setPrimaryStyle("success");
      }
      else if (currentQues.answer == 2) {
        setSecondaryStyle("success");
      }
      else if (currentQues.answer == 3) {
        setTertiaryStyle("success");
      }

      if (answerSelected == 1) {
        setPrimaryStyle("danger");
      }
      else if (answerSelected == 2) {
        setSecondaryStyle("danger");
      }
      else if (answerSelected == 3) {
        setTertiaryStyle("danger");
      }
    }
    document.querySelector("#primarybtn").setAttribute("disabled", "");
    document.querySelector("#secondarybtn").setAttribute("disabled", "");
    document.querySelector("#tertiarybtn").setAttribute("disabled", "");
    setCurrentExplanation(currentQues.explanation);
  }

  const changeNextQuestion = (event) => {
    if (quesList.length - 2 == quesCount) { //last question disable button
      document.querySelector("#changeNextButton").setAttribute("disabled", "");
    }
    document.querySelector("#primarybtn").removeAttribute("disabled", "");
    document.querySelector("#secondarybtn").removeAttribute("disabled", "");
    document.querySelector("#tertiarybtn").removeAttribute("disabled", "");

    setCurrentExplanation("Answer the Question to View Explanation!");
    setPrimaryStyle("light");
    setSecondaryStyle("light");
    setTertiaryStyle("light");
    let currentCount = quesCount;
    currentCount += 1;
    setQuesCount(currentCount);
    setCurrentQues(quesList[currentCount]);
  }

  var timeleft = 120;
  var timeleftstr = "";
  function timer() {
    document.getElementById("startbtn").setAttribute("disabled", "");
    var timerid = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(timerid);
      } else {
        timeleft -= 1;
        var minutes = Math.floor(timeleft / 60);
        var seconds = timeleft % 60;
        var secondsstr = "";
        if (seconds < 10) {
          secondsstr = "0" + JSON.stringify(seconds);
        } else {
          secondsstr = JSON.stringify(seconds);
        }
        timeleftstr = JSON.stringify(minutes) + ":" + secondsstr;
      }
      console.log(timeleftstr);
      document.getElementById("timer").innerHTML = "Time Left-" + timeleftstr;
    }, 1000);
  }

  if (!userLogValue.value) {
    return (<Redirect to='/login/' />);
  }
  else {

    return (
      <div style={{ backgroundColor: "aqua", height: "fit-content" }} className="container" >
        <div style={{ textAlign: "right" }}>
          <h1>
            <Badge style={{ width: "250px" }} id="timer" variant="secondary">
              Timer
            </Badge>
          </h1>
          <h1>
            <Badge style={{ width: "250px" }} variant="secondary">
              Score- {score}
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
            src={currentQues.ques_image}
            alt="No Image For this Question!"
          ></img>
          <h3 id="img-title">{currentQues.ques_text}</h3>
        </div>
        <Button id="startbtn" onClick={timer}>
        Start
      </Button>
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleClick} name='1' className="choicebtn" id="primarybtn" size="lg" variant={primaryBtnStyle}>
            Primary
          </Button>
          <Button onClick={handleClick} name='2' className="choicebtn" id="secondarybtn" size="lg" variant={secondaryBtnStyle}>
            Secondary
          </Button>
          <Button onClick={handleClick} name='3' className="choicebtn" id="tertiarybtn" size="lg" variant={tertiaryBtnStyle}>
            Tertiary
          </Button>
        </div>

        <div style={{ marginTop: "5%" }}>
          <h1>Explanation</h1>
          <p>{currentExplanation}</p>
          <Button onClick={changeNextQuestion} id="changeNextButton" className="choicebtn" size="sm" variant="light">Next One</Button>
        </div>
      </div>
    )
  }
}

export default SingleQuiz


