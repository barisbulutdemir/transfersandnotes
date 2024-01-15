'use client'
import DashboardList from '@/components/dashboard/DashboardList'
import { useRetriveUserQuery } from '@/redux/services/apiSlice'
import { Metadata } from 'next'
import React from 'react'






const Page = () => {

  const { data: user, isLoading, isError} = useRetriveUserQuery();
  
  console.log(user);

  return (
    <>
    <header className='text-white shadow'>
      
    </header>
    <main className='mx-auto max-w-7xl '>
    <DashboardList user={user ?? undefined} />


    </main>
    </>
  )
}

export default Page