import { useEffect, useState } from 'react'

const useTimer = () => {
  const [second, setSecond] = useState('00')
  const [minute, setMinute] = useState('00')
  const [counter, setCounter] = useState(0)
  const [start, setStart] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (start) {
      intervalId = setInterval(() => {
        setCounter(counter => counter + 1)
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [counter, start])

  useEffect(() => {
    increaseSeconds()
    increaseMinutes()
  }, [counter])

  const clearTimer = () => {
    setSecond('00')
    setMinute('00')
    setCounter(0)
  }

  const initTimer = () => {
    setStart(true)
  }

  const stopTimer = () => {
    setStart(false)
    clearTimer()
  }

  const increaseSeconds = () => {
    const secondCounter = counter % 60
    const computedSecond =
      String(secondCounter).length === 1
        ? `0${String(secondCounter)}`
        : String(secondCounter)
    setSecond(computedSecond)
  }

  const increaseMinutes = () => {
    const minuteCounter = Math.floor(counter / 60)
    const computedMinute =
      String(minuteCounter).length === 1
        ? `0${String(minuteCounter)}`
        : String(minuteCounter)
    setMinute(computedMinute)
  }

  return { second, minute, initTimer, stopTimer }
}

export default useTimer
