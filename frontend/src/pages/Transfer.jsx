import React from 'react'
import { UserInfoBar } from '../components'

const Transfer = () => {
  return (
    <div className="flex flex-col justify-between p-6 w-96 h-96 shadow-2xl border-2 border-gray-100 m-4">
      <h1 className="text-3xl font-bold text-center mt-8">Send Money</h1>
      <div className="flex flex-col gap-2 mb-8">
        <UserInfoBar />
        <p className="pb-0.5">Amount (in Rs)</p>
        <input type="text" className="border-2 border-gray-300 outline-2 outline-gray-400 p-2 text-gray-700 text-base font-medium" placeholder="Enter amount"/>
        <button className="w-full bg-green-500 text-gray-100 rounded-md p-2 mt-2">Initiate Transfer</button>
      </div>
    </div>
  )
}

export default Transfer