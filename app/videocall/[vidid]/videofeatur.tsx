'use client';
import * as AgoraRTM from 'agora-rtm-sdk'
import { Camera, Mic } from 'lucide-react';
import { useEffect, useRef } from 'react'

interface RTCOffer {
  type: 'offer'
  offer: RTCSessionDescriptionInit
}

interface RTCAnswer {
  type: 'answer'
  answer: RTCSessionDescriptionInit
}

interface RTCCandidate {
  type: 'candidate'
  candidate: RTCIceCandidate | null
}

type RTCMessage = RTCOffer | RTCAnswer | RTCCandidate

interface VidProps {
  roomId: string
}

const VidFeature: React.FC<VidProps> = ({ roomId }) => {
  let APP_ID: string = '1664e0d56d424b8c8cf233d3389be724'
  let uid: string = String(Math.floor(Math.random() * 10000))

  let client: AgoraRTM.RtmClient | undefined
  let channel: AgoraRTM.RtmChannel | undefined

  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

  let localStream: MediaStream | undefined
  let remoteStream: MediaStream | undefined
  let peerConnection: RTCPeerConnection | undefined

  let queryString: string = window.location.search
  let urlParams: URLSearchParams = new URLSearchParams(queryString)
  let room: string | null = urlParams.get('q')

  const servers: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
  }

  const constraints: MediaStreamConstraints = {
    video: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 },
    },
    audio: true,
  }

  const init = async () => {
    try {
      client = AgoraRTM.default.createInstance(APP_ID)
      await client.login({ uid })

    channel = client.createChannel(room!)
    await channel.join()

    channel.on('MemberJoined', handleUserJoined)

    client.on('MessageFromPeer', handleMessageFromPeer)

      if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia(constraints)
        if (videoRef1.current) {
          videoRef1.current.srcObject = localStream
        }
      }
    } catch (error) {
      console.error('Error creating Agora RTM instance or logging in:', error)
      setTimeout(init, 5000)
    }
  }

  let handleUserJoined = async (MemberId: string) => {
    console.log('A new user joined the channel:', MemberId)
    createOffer(MemberId)
  }

  const handleMessageFromPeer = async (
    message: AgoraRTM.RtmMessage,
    MemberId: string
  ) => {
    const parsedMessage: RTCMessage = JSON.parse(message.text!)

    if (parsedMessage.type === 'offer') {
      createAnswer(MemberId, parsedMessage.offer)
    }

    if (parsedMessage.type === 'answer') {
      addAnswer(parsedMessage.answer)
    }

    if (parsedMessage.type === 'candidate') {
      if (peerConnection && peerConnection.remoteDescription) {
        peerConnection.addIceCandidate(parsedMessage.candidate!)
      }
    }
  }

  const createPeerConnection = async (MemberId: string) => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    if (videoRef2.current) {
      videoRef2.current.srcObject = remoteStream
      videoRef2.current.style.display = 'block'
    }

    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      if (videoRef1.current) {
        videoRef1.current.srcObject = localStream
      }
    }

    localStream.getTracks().forEach((track) => {
      if (peerConnection) {
        peerConnection.addTrack(track, localStream!)
      }
    })

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream?.addTrack(track)
      })
    }

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        client?.sendMessageToPeer(
          {
            text: JSON.stringify({
              type: 'candidate',
              candidate: event.candidate,
            }),
          },
          MemberId
        )
      }
    }
  }

  const createOffer = async (MemberId: string) => {
    await createPeerConnection(MemberId)

    let offer: RTCSessionDescriptionInit | null | undefined = null

    try {
      offer = await peerConnection?.createOffer()
      await peerConnection?.setLocalDescription(offer!)

      client?.sendMessageToPeer(
        { text: JSON.stringify({ type: 'offer', offer }) },
        MemberId
      )
    } catch (error) {
      console.error('Error creating offer:', error)
    }
  }

  const createAnswer = async (
    MemberId: string,
    offer: RTCSessionDescriptionInit
  ) => {
    await createPeerConnection(MemberId)

    try {
      await peerConnection?.setRemoteDescription(offer)

      let answer: RTCSessionDescriptionInit | null | undefined = null
      try {
        answer = await peerConnection?.createAnswer()
        await peerConnection?.setLocalDescription(answer!)

        client?.sendMessageToPeer(
          { text: JSON.stringify({ type: 'answer', answer }) },
          MemberId
        )
      } catch (error) {
        console.error('Error creating answer:', error)
      }
    } catch (error) {
      console.error('Error setting remote description:', error)
    }
  }

  const addAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (peerConnection && peerConnection.currentRemoteDescription === null) {
      try {
        await peerConnection?.setRemoteDescription(answer)
      } catch (error) {
        console.error('Error setting remote description:', error)
      }
    }
  }

  const leaveChannel = async () => {
    if (client) {
      await client.logout()
    }
  }

  const toggleCamera = async () => {
    const videoTrack = localStream
      ?.getTracks()
      .find((track) => track.kind === 'video')

    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled

      const cameraBtn = document.getElementById('camera-btn')
      if (cameraBtn) {
        cameraBtn.style.backgroundColor = videoTrack.enabled
          ? 'rgb(59, 130, 246)'
          : 'rgb(255, 80, 80)'
      }
    }
  }

  const toggleMic = async () => {
    const audioTrack = localStream
      ?.getTracks()
      .find((track) => track.kind === 'audio')

    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled

      const micBtn = document.getElementById('mic-btn')
      if (micBtn) {
        micBtn.style.backgroundColor = audioTrack.enabled
          ? 'rgb(179, 102, 249, .9)'
          : 'rgb(255, 80, 80)'
      }
    }
  }

  useEffect(() => {
    init()

    // Cleanup function to stop the stream when the component unmounts
    return () => {
      leaveChannel()
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
      if (client) {
        client.logout() // Release the Agora RTM instance
      }
    }
  }, [])

 return (
   <>
     <div className="flex relative">
       <video
         ref={videoRef1}
         className="grid grid-cols-[1fr,1fr] gap-4 bg-black w-full h-screen "
         autoPlay
         playsInline
       ></video>
       <video
         ref={videoRef2}
         className="grid grid-cols-[1fr,1fr] gap-4 bg-black w-full h-72 m-4 smallFrame"
         autoPlay
         playsInline
       ></video>
       <div className="flex gap-32 justify-center w-full align-bottom absolute bottom-8 z-20">
         <button
           id="camera-btn"
           className="control-container"
           onClick={toggleCamera}
         >
           <Camera />
         </button>
         <button id="mic-btn" className="control-container" onClick={toggleMic}>
           <Mic />
         </button>
       </div>
     </div>
   </>
 )

}

export default VidFeature
