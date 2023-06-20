import React, { useContext } from "react";
import EndCall from "./Local/EndCall";
import Screenshare from "./Local/Screenshare";

import PropsContext, { PropsInterface, layout } from "../PropsContext";

function LocalControls() {
  const { rtcProps } = useContext<PropsInterface>(PropsContext);

  return (
    <div>
      {/* {/* {rtcProps.role !== "audience" && <LocalVideoMute />} */}
      {/* {rtcProps.role !== "audience" && <LocalAudioMute />} */}
      {rtcProps.role !== "audience" && <Screenshare />}
      <EndCall />
    </div>
  );
}

export default LocalControls;
