import { VideoIcon, PhoneIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';   

const CreateOptions = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link href="/dashboard/create-interview">
        <div className="bg-white shadow-lg p-5 border border-gray-300 rounded-xl cursor-pointer hover:shadow-xl transition">
          <VideoIcon className="p-3 text-white bg-primary rounded-xl h-12 w-12" />
          <h2 className="font-bold mt-2">Create New Interview</h2>
          <p className="text-gray-400">Launch a smart video interview powered by AI.</p>
        </div>
      </Link>

      <Link href="/dashboard/create-interview">
        <div className="bg-white shadow-lg p-5 border border-gray-300 rounded-xl cursor-pointer hover:shadow-xl transition">
          <PhoneIcon className="p-3 text-white bg-green-500 rounded-xl h-12 w-12" />
          <h2 className="font-bold mt-2">Phone Interview</h2>
          <p className="text-gray-400">Schedule and manage interviews via phone call.</p>
        </div>
      </Link>
    </div>
  );
};

export default CreateOptions;
