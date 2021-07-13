/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/Socket';

interface IParams {
  id: string;
  roomID: string;
}

interface IVideoProps {
  videoStatus: boolean;
  microStatus: boolean;
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
  const ref = useRef<HTMLVideoElement>(null);
  const isUser = peerId === videoPeerId;

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getVideoTracks()[0].enabled = videoStatus;
    }
  }, [videoStatus, isUser, videoPeerId]);

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getAudioTracks()[0].enabled = microStatus;
    }
  }, [microStatus, isUser, videoPeerId]);

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (ref && ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        style={{
          margin: '2%',
          height: '25%',
          width: '25%',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
        playsInline
        autoPlay
        ref={ref}
      />
    </>
  );
};

const ChatRoom = ({
  videoStatus,
  microStatus,
}: IVideoProps): JSX.Element => {
  const params = useParams<IParams>();
  const [peerId, setPeerId] = useState<string>('');
  const peersRef = useRef<IPeerWithId[]>([]);
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screenShare, setScreenShare] = useState(false);

  const roomId = params.roomID;

  const removeUserLeavingRoomVideo = (socketId: string) => {
    peersRef.current = peersRef.current.filter((el) => el.peerID !== socketId);
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

  // const addScreen = () => {
  //   const mediaDevices = navigator.mediaDevices as any;
  //   mediaDevices.getDisplayMedia({ video: true, audio: false })
  //     .then((stream: MediaStream) => {
  //       console.log('Add Screen');
  //       // ? ref.current.srcObject = stream;
  //       // eslint-disable-next-line prefer-template
  //       const userID = socket.id + '_screenShare';
  //       const peer = createPeer(userID, socket.id, stream);
  //       if (
  //         !peersRef.current.find(
  //           (peerWithId) => userID === peerWithId.peerID,
  //         )
  //       ) {
  //         peersRef.current.push({
  //           peerID: userID,
  //           peer,
  //           micro: true,
  //           video: true,
  //         });
  //       }
  //       setScreenShare(true);
  //     });
  // };

  useEffect(() => {
    if (roomId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
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
            removeUserLeavingRoomVideo(socketId);
          });
        })
        .catch((err) => console.log('erreur dans getUserMedia : ', err));
    }
  }, []);

  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap' }}>

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
          {/* <button type="button" onClick={() => addScreen()}>share screen</button> */}
        </>
      ))}
    </Container>
  );
};

export default ChatRoom;