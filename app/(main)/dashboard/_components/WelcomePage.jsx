"use client";
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react';

const WelcomePage = () => {
  const { currentUser } = useUser();
  const profilePic = currentUser?.profilepic;

  return (
    <div className="border rounded-xl bg-amber-50 shadow-lg m-10 -mb-10">
      <div className="bg-white flex justify-between items-center p-4 rounded-2xl">
    
        <div>
          <h1 className="text-xl font-bold">
            Welcome back <span className='text-primary'>{currentUser?.name || 'Guest'}</span>
          </h1>
          <h2 className="text-gray-400">AI driven Interviews</h2>
        </div>

     
        {profilePic && (
          <Image
            src={profilePic}
            alt="userImage"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
