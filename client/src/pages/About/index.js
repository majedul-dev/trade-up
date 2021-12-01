import React from "react";
import "./style.css";
import Banner from "../../components/Banner";

const About = () => {
  return (
    <>
      <section className="container section">
        <Banner />
        <h2 className="mb-4">About Us</h2>
        <p className="lead">
          Bartering is the method of obtaining goods or services without the use
          of money and by direct trade. This can be a great way to ensure the
          flow of necessary goods and services in your household without using
          precious funds in times of economic uncertainty or currency
          devaluation TradeUp is an alternative business approach where people
          can trade their products without currency. In addition, most
          approaches consider a correspondence between traded goods in which
          only information on prices and quantities is used.
          <br />
          <br />
          There is no such specific system available in Pakistan where you can
          exchange items or services with other items or services. TradeUp is
          the Pakistan’s first website where you can exchange products online.
          Although there are such systems operating all over the world.
        </p>
      </section>
    </>
  );
};

export default About;
