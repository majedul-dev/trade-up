import React from "react";
import "./style.css";

const Contact = () => {
  return (
    <section className="container section contact-page">
      <article className="contact-form">
        <h2 className="mt-4">Contact Us</h2>
        <form action="" method="">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="form-control"
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control"
            />
            <textarea
              name="message"
              id=""
              cols="30"
              rows="5"
              placeholder="message"
              className="form-control"
            />
            {/* <input
                type="text"
                name="message"
                placeholder="message"
                className="form-control"
              /> */}
          </div>
          <button type="submit" className="submit-btn btn">
            submit here
          </button>
        </form>
      </article>
    </section>
  );
};

export default Contact;
