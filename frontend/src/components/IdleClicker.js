import React, { useState, useEffect } from "react";
import { Row, Col, Button, ButtonGroup, ToggleButton } from "react-bootstrap"

import axiosInstance from "../axiosApi";



function IdleClicker() {
    const [buyAmt, setBuyAmt] = useState(1);
    const [primaryList, setPrimaryList] = useState([]);
    const [secondaryList, setSecondaryList] = useState([]);
    const [tertiaryList, setTertiaryList] = useState([]);
    const [renderSectorList, setRenderSectorList] = useState();

    const [paramsList, setParamsList] = useState();

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Primary', value: '1' },
        { name: 'Secondary', value: '2' },
        { name: 'Tertiary', value: '3' },
    ];

    const IdleClickerUI = (d, params) => {
        return (<div
            key={d.id}
            className="container"
            style={{
                border: "2px solid black",
                borderRadius: "10px",
                marginBottom: "1%",
                marginTop: "1%",
                padding: "0",
            }}
        >
            <Row noGutters>
                <Col sm={12} md={2} style={{ textAlign: "center" }}>
                    <img
                        style={{
                            border: "1px solid black",
                            borderRadius: "50%",
                            objectFit: "contain",
                            width: "150px",
                            height: "150px",
                            marginBottom: "1%",
                            marginTop: "1%",
                        }}
                        src={d.image}
                    ></img>
                </Col>
                <Col sm={12} md={2} style={{ textAlign: "center" }}>
                    <div style={{ textAlign: "center" }}>
                        {d.industry}<br></br>
                        <br></br>
    
                        <Button className="buyBtnChange" onClick={handleBuy} id={params.id} style={{ margin: "auto 0" }} name={buyAmt}>Buy {buyAmt}</Button>
                    </div>
                </Col>
                <Col sm={12} md={4} style={{ display: "inline-block" }}>
                    Income:{params.industry_income}k food/run <br></br>
                    Coins/Run:80<br></br>
                    Current Quantity:{params.current_quantity}<br></br>
                    Cost to buy next {buyAmt}:2000<br></br>
                    Time for 1 Run: 10 sec
                </Col>
                <Col sm={12} md={4} style={{ display: "inline-block" }}>
                    Hi This Manish Pandey,Right Arm Middle Batsman...Favourite Cricketer
                    is Kevin Pietersen.
                </Col>
            </Row>
        </div>);
    };

    useEffect(() => {
        const requestData = async () => {
            const response1 = await axiosInstance.get('/modes/idle-clicker-industry/1/')
            const response2 = await axiosInstance.get('/modes/idle-clicker-industry/2/')
            const response3 = await axiosInstance.get('/modes/idle-clicker-industry/3/')

            const responseparams = await axiosInstance.get('/modes/idle-clicker-params/')

            setParamsList(responseparams.data);
            setPrimaryList(response1.data);
            setSecondaryList(response2.data);
            setTertiaryList(response3.data);
        }
        requestData();
        const list = primaryList.map((d) => {
            const currentId = d.id;
            const params = paramsList[currentId];
            return IdleClickerUI(d, params);
        });
        setRenderSectorList(list);

    }, [])

    const incAmt = () => {
        let newVal = 1;
        if (buyAmt === 1) {
            setBuyAmt(10);
            newVal = 10;
        } else if (buyAmt === 10) {
            setBuyAmt(100);
            newVal = 100;
        } else {
            setBuyAmt(1);
        }
        document.querySelectorAll('.buyBtnChange').forEach((button)=>{
            button.innerHTML = `Buy ${newVal}`;
            button.name = newVal;
        });
    };

    const handleBuy = async (event) => {
        requestData = { 'industryParamsId': event.target.id, 'buyAmount': event.target.name };

        const responsePost = await axiosInstance.post("/modes/idle-clicker-params/",requestData)
        const responseGet = await axiosInstance.get("/modes/idle-clicker-params/")
        setParamsList(responseGet.data);
    }


    const handleSector = (event) => {
        let sector = event.currentTarget.value;
        setRadioValue(sector);

        if (sector == 1) {
            const list = primaryList.map((d) => {
                const currentId = d.id;
                const params = paramsList[currentId];
                return IdleClickerUI(d, params);
            });
            setRenderSectorList(list);
        }
        else if (sector == 2) {
            const list = secondaryList.map((d) => {
                const currentId = d.id;
                const params = paramsList[currentId];
                return IdleClickerUI(d, params);
            });
            setRenderSectorList(list);
        }
        else if (sector == 3) {
            const list = tertiaryList.map((d) => {
                const currentId = d.id;
                const params = paramsList[currentId];
                return IdleClickerUI(d, params);
            });
            setRenderSectorList(list);
        }
    }

    return (
        <div>
            <div
                style={{
                    backgroundColor: "chartreuse",
                    textAlign: "center",
                    padding: "1.5% 0",
                }}
            >
                <Button style={{ width: "85px" }}>Stats</Button>
                <div
                    style={{
                        textAlign: "center",
                        display: "inline-block ",
                        width: "50%",
                    }}
                >
                    952,100,111
                </div>
                <div style={{ textAlign: "right", display: "inline-block" }}>
                     <Button style={{ width: "85px" }}>Managers</Button>
                </div>
            </div>
            <div>
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={handleSector}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
            <div className="container buybtn">
                <Button value={buyAmt} onClick={incAmt}>
                    x{buyAmt}
                </Button>
            </div>

            {renderSectorList}
        </div>
    );
}

export default IdleClicker;

