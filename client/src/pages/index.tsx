import type { NextPage } from 'next'
import Home from '../components/home/main/Home'

const HomePage: NextPage = (props) => {
  return (
    <>
      <Home {...props}/>
    </>
  )
}

export default HomePage
