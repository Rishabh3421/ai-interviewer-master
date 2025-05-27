"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/superbaseClient'
import Image from 'next/image'
import React from 'react'

const Login = () => {

  // Sign in using Google
  const signInGoogle=async()=>{
    const {error} = await supabase.auth.signInWithOAuth({
      provider:"google"
    })
    if(error){
      console.log("error",error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center  h-screen bg-gray-50 px-4">
      {/* Logo */}
      <div className="">
        <Image src="/ChatGPT.png" alt="IntelliHire logo" width={200} height={200}/>
      </div>

      {/* Login Box */}
      <div className="flex flex-col items-center space-y-4 border-2 -mt-13 px-15 py-10 rounded">
        <Image src="/login.png" alt="Interview illustration" width={400} height={400} className="w-[400px] h-[400px]" />

        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Log in to Continue with IntelliHire
        </h2>
        <p className="text-center text-gray-600 -mt-3">
          Sign in securely using your Google account
        </p>

        <Button
        onClick={signInGoogle}
         className="flex items-center space-x-3 bg-[#BB6AC9] text-white px-4 py-2 rounded hover:bg-[#9e5ea9] hover:scale-105 cursor-pointer"
        >
          <Image
            src="/social.png"
            alt="Google icon"
            width={24}
            height={24}
            className="invert"
          />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  )
}

export default Login
