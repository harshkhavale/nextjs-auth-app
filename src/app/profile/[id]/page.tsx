import React from 'react'

export default function UserProfilePage({params}:any) {
  return (
    <div className='flex  flex-col min-h-screen justify-center items-center p-4'>
<h1 className='p-8'>Profile</h1>
<hr />
<h1 className='text-4xl'>user Profile of<span className='ml-2 bg-orange-500 p-2 rounded-lg'>{params.id}</span>
    </h1>
 </div>
  )
}
