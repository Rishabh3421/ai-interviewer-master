import React from 'react'
import CreateOptions from './_components/CreateOptions'
import RecentInterviewsList from './_components/RecentInterviewsList'

const Dashboard = () => {
  return (
    <div>
   
      <h2 className='my-3 mt-5 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions/>
      <RecentInterviewsList/>
    </div>
  )
}

export default Dashboard
