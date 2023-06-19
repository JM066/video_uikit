import "./App.css";
import React, { useContext, useState } from "react";
import PropsContext, {
  PropsProvider,
  PropsInterface,
  RtcPropsInterface,
  layout,
} from "./PropsContext";
import TracksConfigure from "./TracksConfigure";
import RtcConfigure from "./RTCConfigure";
import Screenshare from "./Controls/Local/Screenshare";
import LocalUserContext from "./LocalUserContext";
// import RtmConfigure from "./RTMConfigure";
import GridVideo from "./GridVideo";

// function MyGridVideo() {
//   return <GridVideo />;
// }

export const VideocallUI = () => {
  const { rtcProps } = useContext<PropsInterface>(PropsContext);
  return (
    <RtcConfigure callActive={rtcProps.callActive}>
      <LocalUserContext>
        <GridVideo />
      </LocalUserContext>
      {rtcProps.role !== "audience" && rtcProps.enableScreensharing && (
        <Screenshare />
      )}
    </RtcConfigure>
  );
};
const AgoraUIKit: React.FC<PropsInterface> = (props: PropsInterface) => {
  const { rtcProps } = props;
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
          enableScreensharing: true,
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
