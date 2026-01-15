"use client";

import { FormField } from "@keeper.sh/ui";
import { useShowPasswordField, useIsLoading } from "../contexts/auth-form-context";

export const EmailField = () => {
  const showPasswordField = useShowPasswordField();
  const isLoading = useIsLoading();

  return (
    <FormField
      name="email"
      type="email"
      placeholder="Email"
      required
      autoComplete="email"
      disabled={showPasswordField || isLoading}
    />
  );
};
