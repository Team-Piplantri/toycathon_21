import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Badge, ProgressBar, ButtonGroup, ToggleButton } from "react-bootstrap";

import axiosInstance from "../axiosApi";



function IdleClicker() {
    const [showStats, setShowStats] = useState(false)
    const [showManagers, setShowManagers] = useState(false)

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

    var i = 0;
    const animate = (props) => {
        if (i == 0) {
            i = 1;
            var elem = document.getElementById(props);
            var width = 1;
            var id = setInterval(frame, 100);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    elem.style.width = "0%";
                    i = 0;
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }
        }
    }

    function Stats(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Stats
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                    <div>
                        <Badge className='stats-badge'>Parameter 1</Badge>:<Badge className='stats-badge' style={{ backgroundColor: 'yellow', marginLeft: '1%' }}>value 1</Badge>
                        <ProgressBar now='10' label='10' />
                    </div>
                    <div>
                        <Badge className='stats-badge'>Parameter 2</Badge>:<Badge className='stats-badge' style={{ backgroundColor: 'yellow', marginLeft: '1%' }}>value 2</Badge>
                        <ProgressBar now='20' label='20' />
                    </div>
                    <div>
                        <Badge className='stats-badge'>Parameter 3</Badge>:<Badge className='stats-badge' style={{ backgroundColor: 'yellow', marginLeft: '1%' }}>value 3</Badge>
                        <ProgressBar now='30' label='30' />
                    </div>
                    <div>
                        <Badge className='stats-badge'>Parameter 4</Badge>:<Badge className='stats-badge' style={{ backgroundColor: 'yellow', marginLeft: '1%' }}>value 4</Badge>
                        <ProgressBar now='40' label='40' />
                    </div>
                    <div>
                        <Badge className='stats-badge'>Parameter 5</Badge>:<Badge className='stats-badge' style={{ backgroundColor: 'yellow', marginLeft: '1%' }}>value 5</Badge>
                        <ProgressBar now='50' label='50' />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function Managers(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Managers
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='manager'>
                        <img style={{ width: '100px', height: '100px', borderRadius: '50px', objectFit: 'contain' }} src='http://images5.fanpop.com/image/photos/31600000/Gus-T-T-Showbizand-etc-Smooth-psych-31699715-185-272.jpg' />
                        <h4>Gus TT -</h4>
                        <h4 id='managerof'>Manager of Himashu</h4>
                        <p>Burton "Gus" Guster is a fictional character on Psych played by American actor Dulé Hill. </p>
                        <div style={{ textAlign: 'center' }}>
                            <h5>Cost : $30000</h5>
                            <Button>Appoint</Button>
                        </div>
                    </div>
                    <hr />
                    <div className='manager'>
                        <img style={{ width: '100px', height: '100px', borderRadius: '50px', objectFit: 'contain' }} src='http://images5.fanpop.com/image/photos/31600000/Gus-T-T-Showbizand-etc-Smooth-psych-31699715-185-272.jpg' />
                        <h4>Gus TT -</h4>
                        <h4 id='managerof'>Manager of Himashu</h4>
                        <p>Burton "Gus" Guster is a fictional character on Psych played by American actor Dulé Hill. </p>
                        <div style={{ textAlign: 'center' }}>
                            <h5>Cost : $30000</h5>
                            <Button>Appoint</Button>
                        </div>
                    </div>
                    <hr />
                    <div className='manager'>
                        <img style={{ width: '100px', height: '100px', borderRadius: '50px', objectFit: 'contain' }} src='http://images5.fanpop.com/image/photos/31600000/Gus-T-T-Showbizand-etc-Smooth-psych-31699715-185-272.jpg' />
                        <h4>Gus TT -</h4>
                        <h4 id='managerof'>Manager of Himashu</h4>
                        <p>Burton "Gus" Guster is a fictional character on Psych played by American actor Dulé Hill. </p>
                        <div style={{ textAlign: 'center' }}>
                            <h5>Cost : $30000</h5>
                            <Button>Appoint</Button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

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
                    <div className="myProgress">
                        <div id={`${d.id}e`} className='probar'></div>
                    </div>
                    <Button onClick={() => animate(`${d.id}e`)} >Click me </Button>
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
        document.querySelectorAll('.buyBtnChange').forEach((button) => {
            button.innerHTML = `Buy ${newVal}`;
            button.name = newVal;
        });
    };

    const handleBuy = async (event) => {
        requestData = { 'industryParamsId': event.target.id, 'buyAmount': event.target.name };

        const responsePost = await axiosInstance.post("/modes/idle-clicker-params/", requestData)
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
        <>
            {showStats ? (
                <>
                    <Stats
                        show={showStats}
                        onHide={() => setShowStats(false)}
                    />
                </>
            ) : (
                <></>
            )}
            {showManagers ? (
                <>
                    <Managers
                        show={showManagers}
                        onHide={() => setShowManagers(false)}
                    />
                </>
            ) : (
                <></>
            )}
            <div>
                <div
                    style={{
                        backgroundColor: "chartreuse",
                        textAlign: "center",
                        padding: "1.5% 0",
                    }}
                >
                    <Button onClick={() => setShowStats(true)} style={{ width: "85px" }}>Stats</Button>
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
                        <Button onClick={() => setShowManagers(true)} style={{ width: "85px" }}>Managers</Button>
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
        </>
    );
}

export default IdleClicker;

