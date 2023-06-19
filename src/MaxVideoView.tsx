import React, {
  CSSProperties,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import RtcContext from "./RtcContext";
import { AgoraVideoPlayer, IRemoteVideoTrack } from "agora-rtc-react";
import RemoteVideoMute from "./Controls/Remote/RemoteVideoMute";
import RemoteAudioMute from "./Controls/Remote/RemoteAudioMute";
import PropsContext, { UIKitUser } from "./PropsContext";
import VideoPlaceholder from "./VideoPlaceholder";
import Username from "./Username";
/**
 * React component to display the user video in maximized view
 */
const MaxVideoView = (props: { user: string }) => {
  const { mediaStore } = useContext(RtcContext);
  const { styleProps, rtcProps } = useContext(PropsContext);
  const { maxViewStyles, videoMode, maxViewOverlayContainer } =
    styleProps || {};
  const renderModeProp = videoMode?.max;
  const [isShown, setIsShown] = useState(false);
  const { user } = props;
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childRef.current) {
      mediaStore[user.uid]?.videoTrack?.play(childRef.current);
    }
  }, [user]);

  return <div ref={childRef} style={{ width: "500px", height: "500px" }}></div>;
};

const styles = {
  container: { display: "flex", flex: 1 },
  videoContainer: {
    display: "flex",
    flex: 1,
    position: "relative",
  } as CSSProperties,
  videoplayer: {
    width: "100%",
    display: "flex",
    flex: 1,
  },
  overlay: {
    position: "absolute",
    margin: 5,
    flexDirection: "column",
    display: "flex",
  } as CSSProperties,
  username: {
    position: "absolute",
    background: "#007bffaa",
    padding: "2px 8px",
    color: "#fff",
    margin: 0,
    bottom: 0,
    right: 0,
    zIndex: 90,
  } as CSSProperties,
};

export default MaxVideoView;
