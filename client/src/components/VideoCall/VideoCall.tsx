import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import TextField from '@material-ui/core/TextField';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import './VideoCall.css';

const socket = io(`${process.env.REACT_APP_API_URL}`);

export default function VideoChat() {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal]: any = useState();
  const [idToCall, setIdToCall] = useState('');
  const [me, setMe] = useState('');
  const [userName, setUserName] = useState('');
  const [receivingCall, setReceivingCall] = useState(false);
  const [streaming, setStream] = useState();
  const connectionRef = useRef<any>();
  const myVideo = useRef<any | MediaStream>();
  const userVideo = useRef<any | undefined>();
  const mediaDevices = navigator.mediaDevices as any;

  useEffect(() => {
    mediaDevices.getUserMedia({ video: true, audio: false }).then((streamMedia: any) => {
      setStream(streamMedia);
      myVideo.current.srcObject = streamMedia;
    });

    socket.on('me', (id: any) => {
      setMe(id);
    });

    socket.on('callUser', (data: any) => {
      setReceivingCall(true);
      setCaller(data.from);
      setUserName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const getScreen = async () => {
    mediaDevices.getDisplayMedia({ video: true, audio: false }).then((streamDevice: any) => {
      setStream(streamDevice);
      myVideo.current.srcObject = streamDevice;
    });
  };

  const stopShare = async () => {
    mediaDevices.getUserMedia({ video: true, audio: false }).then((streamDevice: any) => {
      myVideo.current.srcObject = streamDevice;
    });
  };

  const callUser = (id: any) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: streaming,
    });

    peer.on('signal', (data: any) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name: userName,
      });
    });

    peer.on('stream', (streamPeer: any) => {
      userVideo.current.srcObject = streamPeer;
    });

    socket.on('callAccepted', (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: streaming,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (streamPeer) => {
      userVideo.current.srcObject = streamPeer;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <div className="videoContainer">
        <div className="videoButton">
          <button type="button" onClick={() => getScreen()}>Share Screen</button>
          <button type="button" onClick={() => stopShare()}>Stop Share</button>
        </div>
        <div className={callAccepted ? 'groupVideo' : 'video'}>
          {streaming && <video playsInline muted ref={myVideo} autoPlay className={callAccepted ? 'webcam-resize' : 'webcam-full'} />}
          {streaming && <video playsInline muted ref={userVideo} autoPlay className={callAccepted ? 'webcam-resize' : 'second-webcam'} />}
        </div>
      </div>

      <div className={callAccepted ? 'myId2' : 'myId'}>
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <CopyToClipboard text={me}>
          <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
            Copy ID
          </Button>
        </CopyToClipboard>
        <TextField
          id="filled-basic"
          label="ID to call"
          variant="filled"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <div className="call-button">
          {callAccepted && !callEnded ? (
            <Button variant="contained" color="secondary" onClick={leaveCall}>
              End Call
            </Button>
          ) : (
            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
              <PhoneIcon fontSize="large" />
            </IconButton>
          )}
          {idToCall}
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>
                {userName}
                {' '}
                is calling...
              </h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
