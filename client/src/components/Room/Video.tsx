import React, { useEffect, useRef } from 'react';
import './Room.css';
// import Peer from 'simple-peer';

export default function Video() {
  const myVideo = useRef<any | undefined>(null);
  const mediaDevices = navigator.mediaDevices as any;

  useEffect(() => {
    mediaDevices.getDisplayMedia({ video: true, audio: false }).then(
      (streamMedia: MediaStream) => {
        myVideo.current.srcObject = streamMedia;
      },
    );
  }, []);

  return (
    <>
      <video className="video" muted ref={myVideo} autoPlay playsInline />
    </>
  );
}
