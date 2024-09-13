
import React from 'react'
// import Header from './_components/Header'
import Addinterview from './_components/Addinterview'
function dashboard() {
  return (
    <div>
      <h1 className='font-bold text-2xl mt-5 text-green-500' >Dashboard</h1>
      <h2 className='text-black'> Create and Start your AI Mockup Interview</h2>
    
    <div className='grid grid-cols-1 sm:grid-cols-3 my-5'>
    <Addinterview/>
    </div>
    </div>
  )
}

export default dashboard


