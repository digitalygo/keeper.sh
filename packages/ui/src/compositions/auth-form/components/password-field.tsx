"use client";

import type { FC, HTMLProps } from "react";
import { FormField } from "../../../components/form-field";
import { useShowPasswordField, useIsLoading } from "../contexts/auth-form-context";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export const PasswordField: FC<HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  const showPasswordField = useShowPasswordField();
  const isLoading = useIsLoading();

  return (
    <AnimatePresence>
      {showPasswordField && (
        <m.div
          transition={{ duration: 0.16, opacity: { delay: 0.16 } }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="flex flex-col justify-end"
        >
          <FormField
            name="password"
            required
            minLength={8}
            type={props.type}
            autoComplete={props.autoComplete}
            placeholder="Password"
            disabled={isLoading}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
};
