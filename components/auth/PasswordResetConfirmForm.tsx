"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useResetPasswordConfirm } from "@/hooks";
import { Icons } from "../icons";

interface Props {
    uid: string;
    token: string;
}

const PasswordResetConfirmForm = ({ uid, token }: Props) => {
  const { new_password, re_new_password, isLoading, onChange, onSubmit } =
    useResetPasswordConfirm(uid, token);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-5">
        Password Reset Confirm
      </h1>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="new_password"
              name="new_password"
              placeholder="New password"
              type="password"
              disabled={isLoading}
              required
              onChange={onChange}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="re_password">
              Re Password
            </Label>
            <Input
              id="re_new_password"
              name="re_new_password"
              placeholder="Re New password"
              type="password"
              disabled={isLoading}
              required
              onChange={onChange}
            />
          </div>

          <Button onSubmit={onSubmit} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetConfirmForm;
