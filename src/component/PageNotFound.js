import React from 'react'
import animationData from '../Assets/pagenotfound.json'
import Lottie from 'lottie-react'
const PageNotFound = () => {
   
  return (
    <div className='page-not-found'>
    <Lottie  animationData={animationData} />
    </div>
  )
}

export default PageNotFound