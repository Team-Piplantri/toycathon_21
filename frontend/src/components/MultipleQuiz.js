import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";

import UserContext from '../UserContext';
import axiosInstance from "../axiosApi";


const MultipleQuiz = () => {
  const initialQuesObj = {
    answer: 0,
    explanation: "",
    id: 0,
    ques_text: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  }

  const [quesList, setQuesList] = useState([]);
  const [quesCount, setQuesCount] = useState(0);
  const [currentQues, setCurrentQues] = useState(initialQuesObj);
  const [currentExplanation, setCurrentExplanation] = useState("Answer the Question to View Explanation!");
  const [explainDisplayCSS, setExplainDisplayCSS] = useState("none");

  const [option1BtnStyle, setoption1Style] = useState("white");
  const [option2BtnStyle, setoption2Style] = useState("white");
  const [option3BtnStyle, setoption3Style] = useState("white");
  const [option4BtnStyle, setoption4Style] = useState("white");

  const userLogValue = useContext(UserContext);

  useEffect(() => {
    if (!userLogValue.value) {
      // return <Redirect to='/login/' />;
    }
    const requestData = async () => {
      const response = await axiosInstance.get('/modes/list-mq/')
      setQuesList(response.data);
      setCurrentQues(response.data[quesCount]);
    }
    requestData();
  }, []);

  const handleClick = async (event)=>{
    // Submitting Answer to db and Updating Explanation
    let answerSelected = event.target.name;
    const response = await axiosInstance.post('/modes/answer-mq/',{
      'questionID':currentQues.id,
      'answer': answerSelected,
    })
    if(answerSelected==currentQues.answer){
      if(answerSelected==1){
        setoption1Style("chartreuse");
      }
      else if(answerSelected==2){
        setoption2Style("chartreuse");
      }
      else if(answerSelected==3){
        setoption3Style("chartreuse");
      }
      else if(answerSelected==4){
        setoption4Style("chartreuse");
      }
    }
    else{
      if(currentQues.answer==1){
        setoption1Style("chartreuse");
      }
      else if(currentQues.answer==2){
        setoption2Style("chartreuse");
      }
      else if(currentQues.answer==3){
        setoption3Style("chartreuse");
      }
      else if(currentQues.answer==4){
        setoption4Style("chartreuse");
      }

      if(answerSelected==1){
        setoption1Style("#FFC5CB");
      }
      else if(answerSelected==2){
        setoption2Style("#FFC5CB");
      }
      else if(answerSelected==3){
        setoption3Style("#FFC5CB");
      }
      else if(answerSelected==4){
        setoption4Style("#FFC5CB");
      }
    }
    document.querySelector("#opt1").setAttribute("disabled", "");
    document.querySelector("#opt2").setAttribute("disabled", "");
    document.querySelector("#opt3").setAttribute("disabled", "");
    document.querySelector("#opt4").setAttribute("disabled", "");
    setCurrentExplanation(currentQues.explanation);
    setExplainDisplayCSS('block');
  }

  const changeNextQuestion = (event)=>{
    if(quesList.length-2==quesCount){ //last question disable button
      document.querySelector("#changeNextButton").setAttribute("disabled", "");
    }
    document.querySelector("#opt1").removeAttribute("disabled", "");
    document.querySelector("#opt2").removeAttribute("disabled", "");
    document.querySelector("#opt3").removeAttribute("disabled", "");
    document.querySelector("#opt4").removeAttribute("disabled", "");
    setExplainDisplayCSS('none');

    setCurrentExplanation("Answer the Question to View Explanation!");
    setoption1Style("white");
    setoption2Style("white");
    setoption3Style("white");
    setoption4Style("white");
    let currentCount = quesCount;
    let progresdDot = `progress${quesCount}`
    document.getElementById(progresdDot).style.backgroundColor = "chartreuse";
    currentCount+=1;
    setQuesCount(currentCount);
    setCurrentQues(quesList[currentCount]);
  }

  return (
    <div>
      <div style={{ textAlign: "center", margin: "2%" }}>
        <span id="progress0" className="dot"></span>
        <span id="progress1" className="dot"></span>
        <span id="progress2" className="dot"></span>
        <span id="progress3" className="dot"></span>
        <span id="progress4" className="dot"></span>
        <span id="progress5" className="dot"></span>
        <span id="progress6" className="dot"></span>
        <span id="progress7" className="dot"></span>
        <span id="progress8" className="dot"></span>
        <span id="progress9" className="dot"></span>
      </div>
      <div style={{ backgroundColor: "aqua", marginTop: "3%", padding: "2% 3% 2% 3%", }} className="container">{currentQues.ques_text}</div>
      <div style={{ marginTop: "5%" }} className="container">
        <Row>
          <Col style={{ marginBottom: "3%" }} sm={12} md={6}>
            <button
              style={{
                width: "100%",
                height: "100%",
                padding: "2%",
                backgroundColor: `${option1BtnStyle}`,
              }}
              onClick={handleClick}
              name = "1"
              id="opt1"
            >
              {currentQues.option1}
            </button>
          </Col>
          <Col style={{ marginBottom: "3%" }} sm={12} md={6}>
            <button
              style={{
                width: "100%",
                height: "100%",
                padding: "2%",
                backgroundColor: `${option2BtnStyle}`,
              }}
              onClick={handleClick}
              name = "2"
              id="opt2"
            >
              {currentQues.option2}
            </button>
          </Col>
          <Col style={{ marginBottom: "3%" }} sm={12} md={6}>
            <button
              style={{
                width: "100%",
                height: "100%",
                padding: "2%",
                backgroundColor: `${option3BtnStyle}`,
              }}
              onClick={handleClick}
              name = "3"
              id="opt3"
            >
              {currentQues.option3}
            </button>
          </Col>
          <Col style={{ marginBottom: "3%" }} sm={12} md={6}>
            <button
              style={{
                width: "100%",
                height: "100%",
                padding: "2%",
                backgroundColor: `${option4BtnStyle}`,
              }}
              onClick={handleClick}
              name = "4"
              id="opt4"
            >
              {currentQues.option4} 
            </button>
          </Col>
        </Row>
        <div
          style={{
            backgroundColor: "aqua",
            marginTop: "2%",
            padding: "2% 3% 2% 3%",
            display: {explainDisplayCSS},
          }}
          className="container"
          id="explanation"
        >
          {currentExplanation}
        </div>
        <div
          id="nextbtn"
          className="container"
          style={{ backgroundColor: "aquamarine" }}
        >
          <button id="changeNextButton" onClick={changeNextQuestion}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default MultipleQuiz;
