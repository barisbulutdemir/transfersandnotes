'use client'
import { finishInitialLoad, setAuth } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks'
import { useVerifyMutation } from '@/redux/services/apiSlice';
import { useEffect } from 'react'

const useVerify = () => {
    const dispatch = useAppDispatch();
    const [verify] = useVerifyMutation();


    useEffect(() => {
        console.log("verify çalıştı")
        verify(undefined)
            .unwrap()
            .then(()=> {
                dispatch(setAuth());
            })
            .finally(()=> {
                dispatch(finishInitialLoad());
            })
    },[dispatch, verify])
  
}

export default useVerify