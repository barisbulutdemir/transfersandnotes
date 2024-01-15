'use client'

import { useToast } from '@/components/ui/use-toast';
import { useActivationMutation } from '@/redux/services/apiSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface Props {
  params:{
    uid: string;
    token: string;
  }
}

const Page = ({ params }: Props) => {

  const [activation] = useActivationMutation();
  const { toast } = useToast();
  const router = useRouter();


  useEffect(() => {
    const { uid, token } = params;
  
    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast({
          title: "Activation Success",
          description: "Success",
        });
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Activation Failed",
          description: `Failed to activate ${e.message}`,
        });
      })
      .finally(() => {
        router.push('/auth/login');
      });
  
  }, [activation, params, toast, router]); // router değişkenini de bağımlılık dizisine ekledim.
  
  

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className=''>
        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Activating your account...
        </h1>

      </div>
    </div>
  )
}

export default Page