import React, { useState, useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import { Row, Col, Button } from "react-bootstrap";

import axiosInstance from "../axiosApi";

import UserContext from '../UserContext';


// 1 Agriculture 0.35
// 2 Mining 0.25
// 3 Fishing 0.1
// 4 Logging 0.1
// 5 Oil Drilling 0.2

// 6 FMCG 0.3
// 7 Crude Oil 0.15
// 8 Iron & Steel 0.15
// 9 Textiles 0.1
// 10 Energy Prod 0.3

// 11 Health 0.45
// 12 Tourism 0.05
// 13 Banking 0.2
// 14 Transport 0.1
// 15 IT 0.2


function SpecialMode() {
    const [activeIndustry, setActiveIndustry] = useState(1);
    const [activeSector, setActiveSector] = useState(1);
    const [currentScore, setCurrentScore] = useState(0);
    const [stars, setStars] = useState(0);

    const [button1, setButton1] = useState("Agriculture"); //Primary
    const [button2, setButton2] = useState("Mining");
    const [button3, setButton3] = useState("Fishing");
    const [button4, setButton4] = useState("Logging");
    const [button5, setButton5] = useState("Oil Drilling");

    const [slidebuttonName1, setSlideButtonName1] = useState("Raw Materials"); //Primary
    const [slidebuttonName2, setSlideButtonName2] = useState("Labour");
    const [slidebuttonName3, setSlideButtonName3] = useState("Transport");
    const [slidebuttonName4, setSlideButtonName4] = useState("Finance");

    const [slidebuttonValue1, setSlideButtonValue1] = useState(1); //Primary
    const [slidebuttonValue2, setSlideButtonValue2] = useState(1);
    const [slidebuttonValue3, setSlideButtonValue3] = useState(1);
    const [slidebuttonValue4, setSlideButtonValue4] = useState(1);

    const userLogValue = useContext(UserContext);


    useEffect(() => {
        const requestData = async () => {
            const response = await axiosInstance.get(`/modes/specialmode-industry/1/`);
            setSlideButtonValue1(response.data.slider1);
            setSlideButtonValue2(response.data.slider2);
            setSlideButtonValue3(response.data.slider3);
            setSlideButtonValue4(response.data.slider4);
            const responseScore = await axiosInstance.get("/modes/specialmode-params/");
            setCurrentScore(responseScore.data.value);
        }
        requestData();
    }, [])


    const setValSlider = async (event) => {
        let buttonNumber = (event.target.id);
        console.log(buttonNumber);
        buttonNumber = buttonNumber[0];
        console.log(buttonNumber);
        if (buttonNumber == 1) {
            setSlideButtonValue1(event.target.value);

        }
        if (buttonNumber == 2) {
            setSlideButtonValue2(event.target.value);

        }
        if (buttonNumber == 3) {
            setSlideButtonValue3(event.target.value);

        }
        if (buttonNumber == 4) {
            setSlideButtonValue4(event.target.value);
        }
        const requestData = { 'option': buttonNumber, "value": event.target.value, 'industry': activeIndustry, 'sector': activeSector }
        const responseparams = await axiosInstance.post('/modes/specialmode-params/', requestData)
    };


    const handleSector = (event) => {
        let sector = event.currentTarget.name;
        setActiveSector(sector);

        if (sector == 1) {
            setButton1("Agriculture")
            setButton2("Mining")
            setButton3("Fishing")
            setButton4("Logging")
            setButton5("Oil Drilling")

            setSlideButtonName1("Raw Materials")
            setSlideButtonName2("Labour")
            setSlideButtonName3("Transport")
            setSlideButtonName4("Finance")

        }
        else if (sector == 2) {
            setButton1("FMCG")
            setButton2("Crude Oil")
            setButton3("Iron & Steel")
            setButton4("Textiles")
            setButton5("Energy Prod")

            setSlideButtonName1("Raw Materials")
            setSlideButtonName2("Labour")
            setSlideButtonName3("Transport")
            setSlideButtonName4("Finance")

        }
        else if (sector == 3) {
            setButton1("Health")
            setButton2("Tourism")
            setButton3("Banking")
            setButton4("Transport")
            setButton5("IT")

            setSlideButtonName1("Govt. Policy")
            setSlideButtonName2("Labour")
            setSlideButtonName3("Technology")
            setSlideButtonName4("Marketing")

        }
    }

    const handleButtonParam = async (event) => {
        const industry = event.target.value;
        let indNum;
        if (industry == "Agriculture") {
            setActiveIndustry(1);
            indNum = 1;

        }
        if (industry == "Mining") {
            setActiveIndustry(2);
            indNum = 2;

        }
        if (industry == "Fishing") {
            setActiveIndustry(3);
            indNum = 3;

        }
        if (industry == "Logging") {
            setActiveIndustry(4);
            indNum = 4;

        }
        if (industry == "Oil Drilling") {
            setActiveIndustry(5);
            indNum = 5;

        }
        if (industry == "FMCG") {
            setActiveIndustry(6);
            indNum = 6;

        }
        if (industry == "Crude Oil") {
            setActiveIndustry(7);
            indNum = 7;

        }
        if (industry == "Iron & Steel") {
            setActiveIndustry(8);
            indNum = 8;

        }
        if (industry == "Textiles") {
            setActiveIndustry(9);
            indNum = 9;

        }
        if (industry == "Energy Prod") {
            setActiveIndustry(10);
            indNum = 10;

        }
        if (industry == "Health") {
            setActiveIndustry(11);
            indNum = 11;

        }
        if (industry == "Tourism") {
            setActiveIndustry(12);
            indNum = 12;

        }
        if (industry == "Banking") {
            setActiveIndustry(13);
            indNum = 13;

        }
        if (industry == "Transport") {
            setActiveIndustry(14);
            indNum = 14;

        }
        if (industry == "IT") {
            setActiveIndustry(15);
            indNum = 15;

        }
        const response = await axiosInstance.get(`/modes/specialmode-industry/${indNum}/`);
        setSlideButtonValue1(response.data.slider1);
        setSlideButtonValue2(response.data.slider2);
        setSlideButtonValue3(response.data.slider3);
        setSlideButtonValue4(response.data.slider4);
    }

    const handleViewScore = async () => {
        const responseScore = await axiosInstance.get("/modes/specialmode-params/");
        setCurrentScore(responseScore.data.value);
        setStars(responseScore.data.stars);
    }


    if (!userLogValue.value) {
        return (<Redirect to='/login/' />);
    }
    else {


        return (
            <div>
                <div className="area" >
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div
                    className="container"
                    style={{
                        // backgroundColor: "lightblue",
                        marginTop: "2%",
                        textAlign: "center",
                        padding: "2%",
                    }}
                >
                    <Button onClick={handleSector} name='1' style={{ marginRight: "2%" }}>Primary</Button>
                    <Button onClick={handleSector} name='2' style={{ marginRight: "2%" }}>Secondary</Button>
                    <Button onClick={handleSector} name='3' style={{ marginRight: "2%" }}>Tertiary</Button>
                </div>
                <div className="container" style={{ backgroundColor: "chartreuse" }}>
                    <Row>
                        <Col sm={12} md={8}>
                            <div className="container">
                                Industries
                                <Row style={{ marginBottom: "2%" }}>
                                    <Col>
                                        <Button onClick={handleButtonParam} value={button1} size="sm" variant="info">
                                            {button1}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={handleButtonParam} value={button2} size="sm" variant="info">
                                            {button2}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={handleButtonParam} value={button3} size="sm" variant="info">
                                            {button3}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={handleButtonParam} value={button4} size="sm" variant="info">
                                            {button4}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={handleButtonParam} value={button5} size="sm" variant="info">
                                            {button5}
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col sm={12} md={4} style={{ textAlign: "center" }}>
                            <Button onClick={handleViewScore} >Refresh Score</Button>
                        </Col>
                    </Row>
                </div>
                <div className="container">
                    <Row noGutters>
                        <Col sm={12} md={8} style={{ padding: "0" }}>
                            <div
                                style={{
                                    textAlign: "center",
                                    paddingTop: "3% ",
                                    backgroundColor: "lightgrey",
                                }}
                            >

                                <Row>
                                    <Col sm={12} md={3}>
                                        {slidebuttonName1}
                                    </Col>
                                    <Col sm={12} md={9}>
                                        <div className="slidecontainer">
                                            <input
                                                onInput={setValSlider}
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={slidebuttonValue1}
                                                className="slider"
                                                id="1myRange"
                                            />Value:
                                            <input id="1i" onInput={setValSlider} type="number" min="1" max="100" value={slidebuttonValue1} style={{ width: "50px" }}></input>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={12} md={3}>
                                        {slidebuttonName2}
                                    </Col>
                                    <Col sm={12} md={9}>
                                        <div className="slidecontainer">
                                            <input
                                                onInput={setValSlider}
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={slidebuttonValue2}
                                                className="slider"
                                                id="2myRange"
                                            />Value:
                                            <input id="2i" onInput={setValSlider} type="number" min="1" max="100" value={slidebuttonValue2} style={{ width: "50px" }}></input>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={12} md={3}>
                                        {slidebuttonName3}
                                    </Col>
                                    <Col sm={12} md={9}>
                                        <div className="slidecontainer">
                                            <input
                                                onInput={setValSlider}
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={slidebuttonValue3}
                                                className="slider"
                                                id="3myRange"
                                            />Value:
                                            <input id="3i" onInput={setValSlider} type="number" min="1" max="100" value={slidebuttonValue3} style={{ width: "50px" }}></input>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={12} md={3}>
                                        {slidebuttonName4}
                                    </Col>
                                    <Col sm={12} md={9}>
                                        <div className="slidecontainer">
                                            <input
                                                onInput={setValSlider}
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={slidebuttonValue4}
                                                className="slider"
                                                id="4myRange"
                                            />Value:
                                            <input id="4i" onInput={setValSlider} type="number" min="1" max="100" value={slidebuttonValue4} style={{ width: "50px" }}></input>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            Score: {currentScore}
                            Stars: {stars}
                            {/* <i className="fas fa-star"></i> */}
                        </Col>
                    </Row>
                </div>
                {/* <div className="container">
                    <Row noGutters>
                        <Col sm={12} md={4}>
                            Res1
                        </Col>
                        <Col sm={12} md={4}>
                            Res1
                        </Col>
                        <Col sm={12} md={4}>
                            Res1
                        </Col>
                    </Row>
                </div> */}
            </div>
        );
    }
}

export default SpecialMode;