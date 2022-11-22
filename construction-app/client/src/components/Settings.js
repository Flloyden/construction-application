import React from 'react'

export default function Settings() {
  return (
    <div className="p-7 text 2x1 font-semibold flex-1 h-screen bg-white">
        <div className="rounded-lg w-full h-full">
            <h1 className='text-4xl'>Inställningar</h1>
            <div className='w-full h-fit bg-gray-200 mt-4 p-4'>
                <h1>Konto</h1>
            </div>
            <div className='w-full h-fit bg-gray-200 mt-4 p-4'>
                <h1>Översikt</h1>
            </div>
            <div className='w-full h-fit bg-gray-200 mt-4 p-4'>
                <h1>Kunder</h1>
            </div>
            <div className='w-full h-fit bg-gray-200 mt-4 p-4'>
                <h1>Kalender</h1>
            </div>
            <div className='w-full h-fit bg-gray-200 mt-4 p-4'>
                <h1>Garantier</h1>
            </div>
        </div>
    </div>
  )
}
