import React from "react";
import "./style.css";
import banner1 from "../../images/trade up.png";
import banner2 from "../../images/banner3.png";

const Banner = ({ className }) => {
  return (
    <div className="banner">
      <img src={banner1} alt="Banner" className={className} />
      <img src={banner2} alt="Banner" className={className} />
    </div>
  );
};

export default Banner;
