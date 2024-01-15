'use client'

import { Metadata } from "next";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export default function AuthenticationPage() {

  const { email, password, isLoading, onSubmit, onChange} = useLogin();


  return (
    <>
      <div className="container flex justify-center h-[700px] items-center">
        <div className="">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to log in to your account
              </p>
            </div>

            {/* UserRegisterForm içeriği */}
            <form onSubmit={onSubmit}>
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label className="" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ">
                  <Label className="" htmlFor="email">
                    
                    Password
                  </Label>
                  <Link className="text-sm  text-cyan-900"
                   href="/auth/password-reset-request">
                    Forget Password
                   </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    autoCapitalize="none"
                    disabled={isLoading}
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>

                <Button className="mt-5" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign Up with Email
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
            {/* UserRegisterForm sonu */}

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
