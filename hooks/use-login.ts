import { useToast } from '@/components/ui/use-toast';
import { setAuth } from '@/redux/features/authSlice';
import { useLoginMutation } from '@/redux/services/apiSlice';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '@/redux/hooks';

const useLogin = () => {
     // formData 
  const [formData, setFormData] = useState({
   
    email: "",
    password: "",

  });
  const dispatch = useAppDispatch();
  const { email, password } = formData;

  // imports
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();
  const router = useRouter();

  // onChange method
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form onSubmit method
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    login({email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth())
        toast({
          title: "Login Success",
          description: `Welcome `,
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        toast({
          title: "Login Failure",
          description: error.data.detail,
        });
      });
  }
  return {
     email, password, isLoading, onSubmit, onChange
  }
}

export default useLogin