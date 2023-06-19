import React, { useState, useEffect, useRef, PropsWithChildren } from "react";
import { RtcPropsInterface, mediaStore } from "./PropsContext";
import AgoraRTC, { ILocalVideoTrack, ILocalAudioTrack } from "agora-rtc-sdk-ng";
import { TracksProvider } from "./TracksContext";
import useTracks from "../src/hook/useTracks";

const TracksConfigure: React.FC<
  PropsWithChildren<Partial<RtcPropsInterface>>
> = (props) => {
  const [ready, setReady] = useState<boolean>(false);
  const [localVideoTrack, setLocalVideoTrack] =
    useState<ILocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<ILocalAudioTrack | null>(null);
  const { localTracks, error } = useTracks();
  const mediaStore = useRef<mediaStore>({});

  useEffect(() => {
    if (localTracks !== null) {
      setLocalAudioTrack(localTracks[0]);
      setLocalVideoTrack(localTracks[1]);
      mediaStore.current[0] = {
        audioTrack: localTracks[0],
        videoTrack: localTracks[1],
      };
      setReady(true);
    } else if (error) {
      console.error("Error Message:", error);
      setReady(false);
    }
    return () => {
      if (localTracks) {
        // eslint-disable-next-line no-unused-expressions
        localTracks[0]?.close();
        // eslint-disable-next-line no-unused-expressions
        localTracks[1]?.close();
      }
    };
  }, [localTracks, error]); //, ready])

  return (
    <TracksProvider
      value={{
        localVideoTrack: localVideoTrack,
        localAudioTrack: localAudioTrack,
      }}
    >
      {ready ? props.children : null}
    </TracksProvider>
  );
};

export default TracksConfigure;
