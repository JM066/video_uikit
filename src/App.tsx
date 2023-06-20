import * as React from "react";
import { useContext, useState } from "react";
import PropsContext, {
  PropsProvider,
  PropsInterface,
  layout,
} from "./PropsContext";
import TracksConfigure from "./TracksConfigure";
import RtcConfigure from "./RTCConfigure";
import LocalUserContext from "./LocalUserContext";
import LocalControls from "./Controls/LocalControls";
import GridVideo from "./GridVideo";

export const VideocallUI = () => {
  const { rtcProps } = useContext<PropsInterface>(PropsContext);

  return (
    <RtcConfigure callActive={rtcProps.callActive}>
      <LocalUserContext>
        <GridVideo />
        <LocalControls />
      </LocalUserContext>
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
  const [username, setUsername] = useState("");
  // const dispatch = useContext(EventContext);
  // const handleEndCallClick = () => {
  //   const event = new Event("agoraUIKitEndcall");
  //   dispatch(event);
  // };
  return (
    <>
      <button onClick={() => setHost(!isHost)}>Change Role</button>
      {videocall ? (
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
          }}
          rtmProps={{ username: username || "user", displayUsername: true }}
          callbacks={{
            EndCall: () => setVideocall(false),
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
