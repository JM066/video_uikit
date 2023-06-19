import React, { useContext, useEffect, useRef, useState } from "react";
import MinUidContext from "./MinUidContext";
import MaxUidContext from "./MaxUidContext";
import PropsContext from "./PropsContext";
import MaxVideoView from "./MaxVideoView";
import TracksContext from "../src/TracksContext";
import RtcContext from "./RtcContext";
/**
 * React Component to render the user videos in a grid
 */
const GridVideo: React.FC = () => {
  const { client, localVideoTrack, localAudioTrack } = useContext(RtcContext);
  const { styleProps, rtcProps } = useContext(PropsContext);
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);
  const users =
    rtcProps.role === "audience"
      ? [...max, ...min].filter((user) => user.uid !== 0)
      : [...max, ...min];
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        setWidth(parentRef.current.offsetWidth);
        setHeight(parentRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    if (parentRef.current) {
      setWidth(parentRef.current.offsetWidth);
      setHeight(parentRef.current.offsetHeight);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (parentRef.current) {
      localVideoTrack?.play(parentRef.current);
    }
  }, [localVideoTrack]);

  return (
    <>
      <div ref={parentRef} style={{ width: width, height: height }}>
        LOADING LOADING
      </div>
      {users.map((user) => (
        <MaxVideoView
          user={user}
          style={{ ...{ height: "100%", width: "100%" } }}
          key={user.uid}
        />
      ))}
    </>
  );
};

export default GridVideo;
