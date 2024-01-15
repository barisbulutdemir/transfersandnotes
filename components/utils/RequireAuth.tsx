'use client'
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks"

interface Props {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: Props){

    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

    if (isLoading){
       return ( <div>Loading...</div> )
    } 

    if (!isAuthenticated) {
       
          redirect('/auth/login');
    }
    return <>{children}</>
}