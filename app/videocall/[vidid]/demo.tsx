'use client'
import React, { CSSProperties, useState } from 'react'
import AgoraUIKit, { layout } from 'agora-react-uikit'
import { redirect } from 'next/navigation'

const App: React.FC = () => {
  const [videocall, setVideocall] = useState(true)
  const [isHost, setHost] = useState(true)
  const [isPinned, setPinned] = useState(false)
  const [username, setUsername] = useState('')
  let queryString: string = window.location.search
  let urlParams: URLSearchParams = new URLSearchParams(queryString)
  let usn: string | null = urlParams.get('q')

  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flex: 1,
      backgroundColor: '#007bff22',
    },
    videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 },
  }

  return (
    <div style={styles.container} className="flex">
      <div style={styles.videoContainer} className="flex flex-col">
        {videocall ? (
          <>
            <AgoraUIKit
              rtcProps={{
                appId: 'aa74b56a07c9481bb0b537cf4c77a37c',
                channel: 'test',
                token: null, // add your token if using app in secured mode
                layout: isPinned ? layout.pin : layout.grid,
              }}
              rtmProps={{ username: usn! || 'user', displayUsername: true }}
              callbacks={{
                EndCall: () => setVideocall(false),
              }}
            />
          </>
        ) : (
          redirect('/rooms')
        )}
      </div>
    </div>
  )
}

export default App
