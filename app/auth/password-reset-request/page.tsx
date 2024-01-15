import PasswordResetForm from '@/components/auth/PasswordResetForm'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'Password Reset',
  description: 'Password reset'
}

const Page = () => { 
  return (
    <div className='flex justify-center items-center h-[350px]'>
        <PasswordResetForm />
    </div>
  )
}

export default Page