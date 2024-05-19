'use client'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup success', response.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed')
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col py-2 items-center justify-center min-h-screen">
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        placeholder="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value })
        }}
      ></input>
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        placeholder="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value })
        }}
      ></input>
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value })
        }}
      ></input>
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? 'No Signup' : 'Signup'}
      </button>
      <Link href={'/login'}>Visit login page</Link>
    </div>
  )
}
