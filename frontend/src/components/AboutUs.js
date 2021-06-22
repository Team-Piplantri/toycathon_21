import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
        <div class="waveWrapper waveAnimation">
          <div class="waveWrapperInner bgTop">
            <div
              id="aboutcontent"
              style={{ color: "white", textAlign: "center" }}
            >
              <h1>About Us</h1>
              <h3>We are Team Piplantri</h3>
              <CardGroup style={{ color: "black" }}>
                <Card>
                  <Card.Body>
                    <Card.Title>Shubh Pathak</Card.Title>
                    <Card.Text>msm19b018@iiitdm.ac.in</Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Divyam Yadav</Card.Title>
                    <Card.Text>msm19b031@iiitdm.ac.in</Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Kotamarthi Mohan Himanshu</Card.Title>
                    <Card.Text>ced19i026@iiitdm.ac.in</Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              </CardGroup>
              <CardGroup style={{ color: "black" }}>
                <Card>
                  <Card.Body>
                    <Card.Title>Rohan Shingre</Card.Title>
                    <Card.Text>msm19b012@iiitdm.ac.in</Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Mohit Bhasme</Card.Title>
                    <Card.Text>ced19i021@iiitdm.ac.in</Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>

                <Card style={{}}>
                  <Card.Body>
                    <Card.Title>Ayush Shukla</Card.Title>
                    <Card.Text>msm19b014@iiitdm.ac.in</Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              </CardGroup>
            </div>
            <div style={{ textAlign: "center" }}>
              Want to give some feedback?<NavLink to="/contact/" className="btn">Contact Us</NavLink>
            </div>
            <div class="wave waveTop"></div>
          </div>
          <div class="waveWrapperInner bgMiddle">
            <div class="wave waveMiddle"></div>
          </div>
          <div class="waveWrapperInner bgBottom">
            <div class="wave waveBottom"></div>
          </div>
        </div>
      </div>
  );
};

export default AboutUs;