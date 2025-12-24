import type { FC, PropsWithChildren, ComponentProps } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Spinner } from "@/components/spinner";

type ButtonProps = ComponentProps<typeof BaseButton> & {
  isLoading?: boolean;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  isLoading,
  children,
  disabled,
  className,
  ...props
}) => (
  <BaseButton disabled={isLoading || disabled} className={className} {...props}>
    {isLoading ? (
      <span className="relative inline-flex items-center justify-center">
        <span className="invisible">{children}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      </span>
    ) : (
      children
    )}
  </BaseButton>
);
