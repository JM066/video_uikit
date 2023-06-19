import "./App.css";
import React, { useContext, useState } from "react";
import PropsContext, { PropsProvider, layout } from "./PropsContext";
import TracksConfigure from "./TracksConfigure";
import RtcConfigure from "./RTCConfigure";
import LocalUserContext from "./LocalUserContext";
// import RtmConfigure from "./RTMConfigure";
import GridVideo from "./GridVideo";

// function MyGridVideo() {
//   return <GridVideo />;
// }

export const VideocallUI = () => {
  return (
    <RtcConfigure>
      {/* <LocalUserContext> */}
      <GridVideo />
      {/* </LocalUserContext> */}
    </RtcConfigure>
  );
};
const AgoraUIKit = (props) => {
  const { styleProps, rtcProps } = props;
  console.error("rtcProps,", rtcProps);
  return (
    <PropsProvider value={props}>
      <div>
        {rtcProps.role === "audience" ? (
          <VideocallUI />
        ) : (
          <TracksConfigure>
            <VideocallUI />
          </TracksConfigure>
        )}
      </div>
    </PropsProvider>
  );
};
function App() {
  const [videocall, setVideocall] = useState(true);
  const [isHost, setHost] = useState(true);
  const [isPinned, setPinned] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <>
      <button onClick={() => setHost(!isHost)}>Change Role</button>
      <AgoraUIKit
        rtcProps={{
          appId: import.meta.env.VITE_APP_APPID,
          disableRtm: false,
          channel: "test",
          uid: 0,
          token: import.meta.env.VITE_APP_TOKEN,
          tokenUrl: undefined,
          activeSpeaker: false,
          callActive: true,
          enableDualStream: false,
          dualStreamMode: undefined,
          layout: layout.grid,
          role: isHost ? "host" : "audience",
          enableVideo: true,
          enableAudio: true,
          username: "user",
          rtmToken: undefined,
          showPopUpBeforeRemoteMute: true,
          displayUsername: false,
        }}
        rtmProps={{ username: username || "user", displayUsername: true }}
        callbacks={{
          EndCall: () => setVideocall(false),
        }}
      />
    </>
  );
}

export default App;
