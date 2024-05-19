'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState('nothing')

  const getUserDetails = async () => {
    const res = await axios.post('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id) //
  }

  const logout = async () => {
    try {
      const res = await axios.get('/api/users/logout')
      toast.success('logout success')
      router.push('login')
    } catch (error: any) {
      console.log(error.messsage)
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        logout
      </button>
      <button
        className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get user details
      </button>
    </div>
  )
}
