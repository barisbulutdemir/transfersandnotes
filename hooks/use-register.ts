import { useToast } from '@/components/ui/use-toast';
import { useRegisterMutation } from '@/redux/services/apiSlice';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'

const useRegister = () => {
     // formData 
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { first_name, last_name, email, password, re_password } = formData;

  // imports
  const [register, { isLoading }] = useRegisterMutation();
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
    register({ first_name, last_name, email, password, re_password })
      .unwrap()
      .then(() => {

        // Capitalize name for toast 
        const formattedFirstName = first_name.charAt(0).toUpperCase() + first_name.slice(1);
        const formattedLastName = last_name.charAt(0).toUpperCase() + last_name.slice(1);
        toast({
          title: "Register Success",
          description: `Welcome ${formattedFirstName} ${formattedLastName}`,
        });
        router.push("/auth/login");
      })
      .catch((error) => {
        const errorMessage = error.data?.email?.[0] || "Unknown error";
        toast({
          title: "Register Failure",
          description: errorMessage,
        });
      });
  }
  return {
    first_name, last_name, email, password, re_password, isLoading, onSubmit, onChange
  }
}

export default useRegister