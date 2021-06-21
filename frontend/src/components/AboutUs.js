import React from "react";
import { Card, CardGroup } from "react-bootstrap";

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
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </CardGroup>
            <CardGroup style={{ color: "black" }}>
              <Card>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
              <Card style={{}}>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </CardGroup>
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