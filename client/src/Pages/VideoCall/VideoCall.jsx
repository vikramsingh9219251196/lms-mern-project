import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCall = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const roomId = Math.random().toString(36).substring(2, 12);
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomId,
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('#meet'),
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
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
      }
    };

    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;

    script.onload = () => {
      const api = new window.JitsiMeetExternalAPI(domain, options);

      api.addEventListeners({
        readyToClose: () => {
          navigate('/'); 
        }
      });
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  return (
    <div className="h-screen">
      <div id="meet" className="h-full w-full" />
    </div>
  );
};

export default VideoCall;