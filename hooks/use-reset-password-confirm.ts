import { useToast } from "@/components/ui/use-toast";
import { useResetPasswordConfirmMutation } from "@/redux/services/apiSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useResetPassword(uid: string, token: string ) {

    const [ formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });
      // imports
      const router = useRouter();
      const [resetPasswordConfirm , { isLoading }] = useResetPasswordConfirmMutation();
      const { toast } = useToast();
      
      const { new_password, re_new_password } = formData;
    
      // onChange method
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value });
      };
    
      // Form onSubmit method
      async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        resetPasswordConfirm({ uid, token , new_password, re_new_password})
          .unwrap()
          .then(() => {
            toast({
              title: "Success",
              description: `Password reset successfully`,
            });
            router.push('/auth/login')
          })
          .catch(() => {
            const errorMessage = "Unknown error";
            toast({
              title: "Password Change Failure",
              description: errorMessage,
            });
          });
      }
      return {
         new_password, re_new_password, isLoading, onSubmit, onChange
      }
    }
