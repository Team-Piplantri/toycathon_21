import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";

import axiosInstance from "../axiosApi";

function Chanbot(props) {
  const [showBot, setShowBot] = useState(false);
  const [quote,setQuote] = useState("");

  async function callChanbot() {
    document.getElementById(props.id).style.opacity = "0.6";
    document.getElementById("float-btn").style.display = "none";
    const response = await axiosInstance.get("/modes/chan-quote/");
    setQuote(response.data.quote);
    setShowBot(true);
  }

  function closeChanbot() {
    document.getElementById(props.id).style.opacity = "1";
    document.getElementById("float-btn").style.display = "block";
    setQuote("");
    setShowBot(false);
  }

  return (
    <div>
      <Button id="float-btn" onClick={callChanbot}>
        Hint
      </Button>
      {showBot ? (
        <div className='bochak'>
          <div className="chan-box">
            <div className="close-icon">
              <MdClose
                size="2em"
                style={{ cursor: "pointer" }}
                onClick={closeChanbot}
              />
            </div>
            <p>{quote}</p>
          </div>
          <div id='chanakya'>
            <img src="https://i.imgur.com/WKFJfD3.png" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Chanbot;