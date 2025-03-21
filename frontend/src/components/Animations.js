import React from "react";

const Loader = () => {
  const loaderStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  };

  const videoStyles = {
    width: "200px", // Adjust the loader size
    height: "auto",
  };

  return (
    <div style={loaderStyles}>
      <video autoPlay loop muted style={videoStyles}>
        <source src="/loader.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
