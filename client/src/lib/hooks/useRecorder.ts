import { useEffect, useState } from 'react'
import { Recorder } from '../interfaces'

const initialState: Recorder = {
  isRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null
}

const useRecorder = () => {
  const [recorder, setRecorder] = useState<Recorder>(initialState)

  useEffect(() => {
    setRecorder(prevState => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream)
        }
      else return prevState
    })
  }, [recorder.mediaStream])

  useEffect(() => {
    const mediaRecorder = recorder.mediaRecorder
    let chunks: Blob[] = []

    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      mediaRecorder.start()

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mpeg; codecs=MPEG-1' })
        chunks = []
        const file = new File([blob], 'audio.mp3', {
          type: 'audio/mpeg; codecs=MPEG-1'
        })

        setRecorder((prevState: Recorder) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: file
            }
          else return initialState
        })
      }
    }

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getAudioTracks().forEach(track => track.stop())
      }
    }
  }, [recorder.mediaRecorder])

  const startRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setRecorder(prevState => ({
        ...prevState,
        mediaStream: stream,
        isRecording: true
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const finishRecord = () => {
    if (recorder.mediaRecorder) {
      if (recorder.mediaRecorder.state === 'recording') {
        recorder.mediaRecorder.stop()
      }
    }
  }

  const clearRecord = () => {
    setRecorder(initialState)
  }

  const cancelRecord = () => {
    setRecorder(initialState)
  }

  return {
    recorder,
    clearRecord,
    startRecord,
    finishRecord,
    cancelRecord
  }
}

export default useRecorder
