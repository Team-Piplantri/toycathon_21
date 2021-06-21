import React from "react";

const ContactForm = () => {
  return (
    <div className="contactus">
      <section className="right" style={{ paddingTop: "8px" }}>
        <h1 style={{ margin: "0 ", color: "white", textAlign: "center" }}>
          Contact Us
        </h1>
        <form
          action="https://formsubmit.co/ed92179d996bb9fa1dd996f559e6ff95"
          method="POST"
        >
          <input type="hidden" name="_next" value="https://google.com" />
          <input
            type="hidden"
            name="_subject"
            value="New submission from Chanakya!"
          ></input>
          <input
            className="input"
            name="userame"
            placeholder="Username"
            required
          />
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email Address"
            required
          />
          <textarea name="message" placeholder="Message" required />
          <div className="text-center">
            <input type="submit" className="button" value="Submit" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactForm;