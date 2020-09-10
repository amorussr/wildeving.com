import React from "react"

const ContactForm = () => (
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    className="contact-form-container"
  >
    <input type="hidden" name="form-name" value="contact" />
    <p hidden>
      <label>
        Don't fill this out: <input name="bot-field" />
      </label>
    </p>
    <h1>Send me a message</h1>
    <p>
      Fell free to get in touch with me with anything related to Wildeving or
      you can just say hi I will get back to you as soon as I can.
    </p>
    <div className="input-wrapper">
      <input
        type="text"
        name="name"
        className="contact-name--input border--input"
        placeholder="Name"
      />
      <p className="contact-name--input--error input--error--msg">
        Please enter your name
      </p>
    </div>
    <div className="input-wrapper">
      <input
        type="email"
        name="email"
        className="contact-email--input border--input"
        placeholder="Email"
      />
      <p className="contact-email--input--error input--error--msg">
        Please enter a vaild email address
      </p>
    </div>
    <div className="input-wrapper">
      <input
        type="text"
        name="subject"
        className="contact-subject--input border--input"
        placeholder="Subject"
      />
      <p className="contact-subject--input--error input--error--msg">
        Please enter a subject
      </p>
    </div>
    <div className="input-wrapper">
      <textarea
        type="text"
        name="message"
        rows="5"
        className="contact-message--input border--input"
        placeholder="Message"
      ></textarea>
      <p className="contact-message--input--error input--error--msg">
        Please write a message
      </p>
      <button
        style={{ border: "none" }}
        type="submit"
        className="btn btn--primary"
      >
        Send
      </button>
    </div>
  </form>
)

export default ContactForm
