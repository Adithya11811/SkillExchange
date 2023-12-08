'use client';
import { useEffect, useRef } from 'react'
import * as AgoraRTM from 'agora-rtm-sdk'


const Page: React.FC = () => {
  let APP_ID: string = 'aa74b56a07c9481bb0b537cf4c77a37c'
  let localStream: MediaStream | undefined
  let remoteStream: MediaStream | undefined
  let peerConnection: RTCPeerConnection | undefined
  let token:string | undefined = undefined
  let uid: string = String(Math.floor(Math.random() * 10000))

  let client: AgoraRTM.RtmClient | undefined
  let channel: AgoraRTM.RtmChannel | undefined

  let queryString: string = window.location.search
  let urlParams: URLSearchParams = new URLSearchParams(queryString)
  let roomId: string | null = urlParams.get('q')

  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)

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

  const handleUserJoined = async (MemberId: string) => {
    console.log('A new User Joined the channel', MemberId)
    createOffer(MemberId)
  }
  
  const handleMessageFromPeer = async(message:any, MemberId:string) =>{
    console.log('Message', message.text)

  }

  const init = async () => {
    try {
      
      client = AgoraRTM.default.createInstance(APP_ID)
      await client.login({ uid, token: token! })

      if (!channel) {
        channel = client.createChannel(roomId!)
        channel.join()

        channel.on('MemberJoined', handleUserJoined)

        client.on('MessageFromPeer', handleMessageFromPeer)
      }

      if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        // Assuming you want to play the stream in the first video element
        if (videoRef1.current) {
          videoRef1.current.srcObject = localStream
        }
      }
    } catch (error) {
      console.error('Error creating Agora RTM instance or logging in:', error)
    }
  }

  const createOffer = async (MemberId:string) => {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection(servers)
    }

    remoteStream = new MediaStream()
    if (videoRef2.current) {
      videoRef2.current.srcObject = remoteStream
    }

    let offer: RTCSessionDescriptionInit = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    localStream?.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, localStream!)
    })

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream?.addTrack(track)
      })
    }

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log('New Ice Candidate', event.candidate)
      }
    }

    console.log('OFFER: ', offer)

    client?.sendMessageToPeer(
      { text: 'Heyy!!!' },
      MemberId
    )
  }

  useEffect(() => {
    init()
    // Cleanup function to stop the stream when the component unmounts
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, []) // Empty dependency array to run the effect only once on mount

  return (
    <div className="flex">
      <video
        ref={videoRef1}
        className="grid grid-cols-[1fr,1fr] gap-4 bg-black w-full h-72 m-4"
        autoPlay
        playsInline
      ></video>
      <video
        ref={videoRef2}
        className="grid grid-cols-[1fr,1fr] gap-4 bg-black w-full h-72 m-4"
        autoPlay
        playsInline
      ></video>
    </div>
  )
}

export default Page
