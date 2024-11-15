import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCall = () => {
  const navigate = useNavigate();
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [error, setError] = useState(null);

  const requestPermissions = async () => {
    try {
      // Request both camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // Stop the stream after getting permissions
      stream.getTracks().forEach(track => track.stop());
      
      setPermissionsGranted(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Please allow camera and microphone access to join the call.');
      console.error('Permission error:', err);
      return false;
    }
  };

  const initializeJitsi = async () => {
    // Check if permissions are granted first
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const roomId = Math.random().toString(36).substring(2, 12);
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomId,
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('#meet'),
      userInfo: {
        displayName: 'User' // You can set this dynamically based on your user data
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
        enableClosePage: true
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
          'tileview', 'download', 'help'
        ],
        SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
        SHOW_JITSI_WATERMARK: false,
      }
    };

    // Load Jitsi Meet API script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;

    script.onload = () => {
      const api = new window.JitsiMeetExternalAPI(domain, options);

      api.addEventListeners({
        readyToClose: () => {
          navigate('/');
        },
        videoConferenceJoined: () => {
          console.log('User has joined the conference');
        },
        participantJoined: () => {
          console.log('Another participant has joined');
        }
      });
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  };

  useEffect(() => {
    initializeJitsi();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 mb-4">⚠️ {error}</div>
          <button
            onClick={() => initializeJitsi()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div id="meet" className="h-full w-full" />
    </div>
  );
};

export default VideoCall;