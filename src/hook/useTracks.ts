import { useEffect, useState } from "react";
import AgoraRTC, { ILocalVideoTrack, ILocalAudioTrack } from "agora-rtc-sdk-ng";

export default function useTracks() {
  const [localTracks, setLocalTracks] = useState<
    [ILocalAudioTrack, ILocalVideoTrack] | null
  >(null);
  const [error, setError] = useState<any>();

  async function createLocalMicroAndAudio() {
    try {
      const localAudio = await AgoraRTC.createMicrophoneAudioTrack();
      const localVideo = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: {
          width: 640,
          height: { ideal: 480, min: 400, max: 500 },
          frameRate: 15,
          bitrateMin: 600,
          bitrateMax: 1000,
        },
      });
      setLocalTracks([localAudio, localVideo]);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    createLocalMicroAndAudio();
  }, []);

  return { localTracks, error };
}
