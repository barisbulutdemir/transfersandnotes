import { useToast } from "@/components/ui/use-toast";
import { useResetPasswordMutation } from "@/redux/services/apiSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useResetPassword() {

    const [ email, setEmail] = useState('');
      // imports
      const [resetPassword, { isLoading }] = useResetPasswordMutation();
      const { toast } = useToast();
      const router = useRouter();
    
      // onChange method
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      };
    
      // Form onSubmit method
      async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        resetPassword(email)
          .unwrap()
          .then(() => {
            toast({
              title: "Success",
              description: `Request sent, check your email for reset link`,
            });
            router.push('/')
          })
          .catch(() => {
            const errorMessage = "Unknown error";
            toast({
              title: "Register Failure",
              description: errorMessage,
            });
          });
      }
      return {
         email, isLoading, onSubmit, onChange
      }
    }
