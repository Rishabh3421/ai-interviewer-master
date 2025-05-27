"use client"
import { Button } from '@/components/ui/button'
import { Plus, VideoIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const RecentInterviewsList = () => {
  const [interviewLists, setInterviewLists] = useState([]) // ✅ Initialize as empty array

  useEffect(() => {
    // Simulate fetch (replace with Supabase fetch later)
    const dummyData = [] // You can replace this with real data
    setInterviewLists(dummyData)
  }, [])

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl mt-5">Previously Created Interviews</h2>

      {interviewLists.length === 0 ? (
        <div className="p-5 flex flex-col items-center text-center space-y-3 bg-white shadow rounded-xl mt-4">
          <VideoIcon className="p-3 text-white bg-primary rounded-xl h-12 w-12" />
          <h2 className="text-lg font-semibold">You don’t have any interviews created</h2>
          <Button className="gap-2">
            <Plus size={18} /> Create New Interview
          </Button>
        </div>
      ) : (
        <ul className="space-y-4 mt-4">
          {interviewLists.map((interview) => (
            <li
              key={interview.id}
              className="bg-white shadow p-4 rounded-lg border border-gray-200"
            >
              <h3 className="font-semibold">{interview.title}</h3>
              <p className="text-sm text-gray-500">{interview.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecentInterviewsList
