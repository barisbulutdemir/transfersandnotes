'use client'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useResetPassword } from '@/hooks'
import { Icons } from '../icons'

const PasswordResetForm = () => {
    const {email, isLoading, onChange, onSubmit} = useResetPassword();

    
  return (
    <div>
        <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
              onChange={onChange}

            />
            
          
          <Button
          onSubmit={onSubmit}
          
          disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
        </div>

      </form>
    </div>
  )
}

export default PasswordResetForm