import React from "react";
import "./Img.css";

const Img = ({ address, source, onShow }) => {
  console.log(address);

  return (
    <div style={container}>
      <img style={imgStyle} src={address} onClick={() => onShow(source)} />
    </div>
  );
};

const container = {
  margin: 10,
};

const imgStyle = {
  display: "block",
  width: "95%",
  borderRadius: 10,
  boxShadow: "2px 2px 5px rgba(#000, .7)",
};

export default Img;
