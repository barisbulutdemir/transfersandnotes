import PasswordResetConfirmForm from '@/components/auth/PasswordResetConfirmForm'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Password Reset',
  description: 'Password reset'
}


interface Props {
  params: {
    uid: string;
    token: string;
  }
}

const Page = ( { params: { uid, token }}: Props ) => { 
  return (
    <div className='flex justify-center items-center h-[625px]'>
        <PasswordResetConfirmForm uid={uid} token={token} />
    </div>
  )
}

export default Page