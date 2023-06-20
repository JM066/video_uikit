import React, { useContext } from "react";
import RtcContext, { RtcContextInterface } from "../../RtcContext";
import BtnTemplate from "../BtnTemplate";

function Screenshare() {
  const { isScreensharing, toggleScreensharing } =
    useContext<RtcContextInterface>(RtcContext);
  console.log("SCREENSHARE", isScreensharing);
  return (
    <>
      <BtnTemplate
        name={isScreensharing ? "stop" : "screen"}
        onClick={() => toggleScreensharing()}
      />
    </>
  );
}

export default Screenshare;
