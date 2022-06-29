import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

// const styles = {
//   border: "3rem solid beige",
//   borderRadius: "0.25rem",
// };

const Canvas = () => {
  return (
    <ReactSketchCanvas
      //   style={styles}
      height="90vh"
      width="90vw"
      strokeWidth={4}
      strokeColor="black"
      position="relative"
    />
  );
};

export default Canvas;
