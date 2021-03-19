import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import infinity from "./loaders/379.gif";

import Img from "./components/Img";
import "./components/Dialog.css";

function App() {
  const [images, setImages] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [showImage, setShowImage] = useState("");
  const [showImageSrc, setShowImageSrc] = useState("");

  useEffect(() => {
    getImages();
  });

  const Show = (imageSrc) => {
    let currIdx = images.indexOf(imageSrc);
    console.log(currIdx);

    setShowImage(imageSrc);
    setShowImageSrc(imageSrc.urls.thumb);
    setDialog(true);
  };

  const moveRight = (e) => {
    e.stopPropagation();

    let currIdx = images.indexOf(showImage);

    if (currIdx >= images.length - 1) {
      setDialog(false);
    } else {
      let nextImage = images[currIdx + 1];
      setShowImage(nextImage);
      setShowImageSrc(nextImage.urls.thumb);
    }
  };

  const moveLeft = (e) => {
    e.stopPropagation();

    let currIdx = images.indexOf(showImage);

    if (currIdx <= 0) {
      setDialog(false);
    } else if (currIdx > 0) {
      let nextImage = images[currIdx - 1];
      setShowImage(nextImage);
      setShowImageSrc(nextImage.urls.thumb);
    }
  };

  const getImages = async (count = 20) => {
    const accessKey = "vizdGwARHPsLnixTFMGfRf-oJU3coN4Ah02I6vXDiyg";

    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${accessKey}&count=${count}`
      )
      .then((response) => {
        setImages([...images, ...response.data]);
      });
  };

  return (
    <div className="App" style={{ background: "#212120" }}>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={images.length}
        next={() => getImages(5)}
        hasMore={true}
        loader={<img src={infinity} alt="loading" />}
      >
        <div
          style={{
            maxWidth: "60rem",
            margin: "0 auto",
            display: "column",
            columns: 4,
            gap: "1em",
          }}
        >
          {images.map((image, id) => {
            return (
              <Img address={image.urls.thumb} source={image} onShow={Show} />
            );
          })}
        </div>
        {dialog ? (
          <div
            id="dialog"
            onClick={() => {
              setDialog(false);
            }}
          >
            <FaArrowAltCircleLeft
              style={navStyle}
              className="left-arrow"
              onClick={moveLeft}
            />

            <img style={dialogImg} src={showImageSrc} alt=""></img>

            <FaArrowAltCircleRight
              style={navStyle}
              className="right-arrow"
              onClick={moveRight}
            />
          </div>
        ) : (
          ""
        )}
      </InfiniteScroll>
    </div>
  );
}

const navStyle = { color: "grey", height: "10%", width: "10%" };

const dialogImg = {
  height: "50vh",
  maxWidth: "60vw",
  objectFit: "cover",
  borderRadius: 10,
  left: "50%",
};

export default App;
