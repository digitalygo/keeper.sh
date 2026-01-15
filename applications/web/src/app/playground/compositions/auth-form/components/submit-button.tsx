"use client";

import type { FC } from "react";
import { Button, ButtonText } from "@keeper.sh/ui";
import { useIsLoading } from "../contexts/auth-form-context";

interface SubmitButtonProps {
  children: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
  const isLoading = useIsLoading();

  return (
    <Button
      size="large"
      type="submit"
      className="w-full text-center"
      isLoading={isLoading}
    >
      <ButtonText className="w-full text-center">{children}</ButtonText>
    </Button>
  );
};
