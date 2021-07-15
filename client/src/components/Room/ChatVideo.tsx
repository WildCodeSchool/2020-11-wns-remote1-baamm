/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/Socket';
import './ChatVideo.style.css';

interface IParams {
  id: string;
  roomID: string;
}

interface IPayload {
  signal: string | SignalData;
  callerID: string;
  id: string;
}

interface IPeerWithId {
  peerID: string;
  peer: Peer.Instance;
  micro: boolean;
  video: boolean;
}

interface IPeer {
  peer: Peer.Instance;
  microStatus: boolean;
  videoStatus: boolean;
  peerId: string;
  videoPeerId: string;
}

const Video = ({
  peer,
  microStatus,
  videoStatus,
  peerId,
  videoPeerId,
}: IPeer) => {
  const ref = useRef<any>(null);
  const isUser = peerId === videoPeerId;

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getVideoTracks()[0].enabled = videoStatus;
    }
  }, [videoStatus, isUser, videoPeerId]);

  useEffect(() => {
    socket.on('receive change', (mediaChange: any) => {
      if (videoPeerId === mediaChange.peerId && ref?.current?.srcObject) {
        // eslint-disable-next-line max-len
        (ref.current.srcObject as MediaStream).getVideoTracks()[0].enabled = mediaChange.videoStatus;
      }
      // eslint-disable-next-line max-len
      // (ref.current.srcObject as MediaStream).getAudioTracks()[0].enabled = mediaChange.microStatus;
    });
  }, [videoStatus, isUser, videoPeerId]);

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getAudioTracks()[0].enabled = microStatus;
    }
  }, [microStatus, isUser, videoPeerId]);

  useEffect(() => {
    socket.emit('switch', { peerId, videoStatus, microStatus });
  }, [microStatus, videoStatus, videoPeerId]);

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (ref && ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer, videoStatus]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="video_container"
        playsInline
        autoPlay
        ref={ref}
      />
    </>
  );
};

const ChatVideo = () => {
  const params = useParams<IParams>();
  const [peerId, setPeerId] = useState<string>('');
  const peersRef = useRef<IPeerWithId[]>([]);
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screenShare, setScreenShare] = useState(false);
  const [videoStatus, setVideoStatus] = useState(true);
  const [microStatus, setMicroStatus] = useState(false);

  const roomId = params.roomID;

  const removeUser = (socketId: string) => {
    const supressPeer = peersRef.current.find((target) => target.peerID === socketId);
    if (supressPeer) {
      supressPeer.peer.destroy();
    }
    peersRef.current = peersRef.current.filter((target) => target.peerID !== socketId);
    setPeers(peersRef.current.map((target) => target.peer));
  };

  const createPeer = (
    userToSignal: any,
    callerID: string,
    stream: MediaStream,
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      console.log('CREATE PEER => peer on signal');
      socket.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });
    console.log('CREATE PEER => new peer', peer);
    return peer;
  };

  const addPeer = (
    incomingSignal: string | SignalData,
    callerID: string,
    stream: undefined | MediaStream,
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on('signal', (signal) => {
      console.log('ADD PEER => SIGNAL');

      socket.emit('returning signal', {
        signal,
        callerID,
      });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  useEffect(() => {
    if (roomId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream: MediaStream) => {
          socket.emit('join room', roomId);

          socket.on('all users', (users: string[]) => {
            const usersPeers: Peer.Instance[] = [];
            users.forEach((userID: string) => {
              const peer = createPeer(userID, socket.id, stream);
              if (
                !peersRef.current.find(
                  (peerWithId) => userID === peerWithId.peerID,
                )
              ) {
                peersRef.current.push({
                  peerID: userID,
                  peer,
                  micro: false,
                  video: true,
                });
                setPeerId(userID);
              }
              usersPeers.push(peer);
            });
            setPeers(usersPeers);
          });

          socket.on('user joined', (payload: IPayload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            if (
              !peersRef?.current?.find(
                (video) => payload.callerID === video.peerID,
              )
            ) {
              peersRef.current.push({
                peerID: payload.callerID,
                peer,
                micro: true,
                video: false,
              });
              setPeers([...peers, peer]);
            }
            console.log('USER JOINED', peersRef);
            setScreenShare(!screenShare);
          });

          socket.on('receiving returned signal', (payload: IPayload) => {
            console.log('useEffect => receiving returned signal');
            const item = peersRef?.current?.find(
              (p) => p.peerID === payload.id,
            );
            item?.peer?.signal(payload.signal);
            console.log('RECEIVING Signal');
          });

          socket.on('removeUserVideo', (socketId: string) => {
            console.log('useEffect => removeUserVideo');
            removeUser(socketId);
          });
        })
        .catch((err) => console.log('erreur dans getUserMedia : ', err));
    }
  }, []);

  return (
    <div className="allVideosContainer">
      <Container style={{ display: 'flex', flexWrap: 'wrap', flex: 10 }}>

        {peersRef?.current.map((peer: IPeerWithId) => (
          <>
            <Video
              key={peer.peerID}
              peer={peer.peer}
              microStatus={microStatus}
              videoStatus={videoStatus}
              peerId={peerId}
              videoPeerId={peer.peerID}
            />
          </>
        ))}
      </Container>
      <div className="video_navBar">
        <div className="button_container">
          <button type="button" className="video_navBar_button" onClick={() => setMicroStatus(!microStatus)}>
            {microStatus
              ? <FontAwesomeIcon icon={faMicrophoneAltSlash} />
              : <FontAwesomeIcon icon={faMicrophoneAlt} />}
          </button>
        </div>

        <div className="button_container">
          <button type="button" className="video_navBar_button" onClick={() => setVideoStatus(!videoStatus)}>
            {videoStatus
              ? <FontAwesomeIcon icon={faVideoSlash} />
              : <FontAwesomeIcon icon={faVideo} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;
