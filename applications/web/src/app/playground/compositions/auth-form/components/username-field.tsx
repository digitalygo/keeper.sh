"use client";

import { FormField } from "@keeper.sh/ui";
import { useShowPasswordField, useIsLoading } from "../contexts/auth-form-context";

export const UsernameField = () => {
  const showPasswordField = useShowPasswordField();
  const isLoading = useIsLoading();

  return (
    <FormField
      name="username"
      type="text"
      placeholder="Username"
      required
      autoComplete="username"
      disabled={showPasswordField || isLoading}
    />
  );
};
