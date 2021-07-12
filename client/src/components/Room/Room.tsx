import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { useParams } from 'react-router-dom';
import socket from '../../socket/Socket';

import Video from './Video';
import './Room.css';

interface IParams {
  id: string;
  roomID: string;
}

interface IPeer {
  peer: Peer.Instance
}

const VideoPeer = ({ peer }: IPeer) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (videoRef && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, [peer]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video className="video" playsInline autoPlay ref={videoRef} style={{ border: 1, borderStyle: 'solid', borderColor: 'red' }} />
  );
};

const VideoRoom = () => {
  const params = useParams<IParams>();
  const [peers, setPeers] = useState<Peer.Instance[]>([]);

  // const socketRef = useRef<any>();
  // const userVideo = useRef<any | undefined>();
  const peersRef = useRef<any>([]);
  const roomId = params.roomID;

  function createPeer(userToSignal: string, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('sending signal', { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal: string, callerID: string, stream: undefined | MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  useEffect(() => {
    // socketRef.current = io.connect('localhost:5000/', { transports: ['websocket'] });
    // eslint-disable-next-line max-len
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream: MediaStream) => {
      // userVideo.current.srcObject = stream;
      socket.emit('join room', roomId);
      socket.on('all users', (users: any) => {
        users.forEach((userID: any) => {
          const peer = createPeer(userID, socket.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socket.on('user joined', (payload: any) => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers((users) => [...users, peer]);
      });

      socket.on('receiving returned signal', (payload: any) => {
        const item = peersRef.current.find((p: any) => p.peerID === payload.id);
        item?.peer?.signal(payload.signal);
      });
    });
  }, []);

  return (
    <div className="allVideosContainer">
      {/* <video className="video" muted ref={userVideo} autoPlay playsInline /> */}
      {peers.map((peer, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <VideoPeer key={index} peer={peer} />
      ))}
    </div>
  );
};

export default VideoRoom;
