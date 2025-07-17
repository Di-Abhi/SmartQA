import React from 'react'
import { Link, Links } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container text-center py-5'>
      <h2 className='mb-4'>SmartQA - Get Started</h2>
      <p className='mb-2'>Click on Create Room if you are the host.Share the code with participant</p>
      <p className='mb-4'>If you a participant, then click on Join Room. Ask for room code from the host of the meeting.</p>
      <Link to="/create" className='btn btn-primary mx-3'>Create Room</Link>
      <Link to="/join" className='btn btn-success mx-3'>Join Room</Link>
    </div>
  )
}

export default Home
