import type { FC } from "react";

interface GoogleIconProps {
  className?: string;
}

export const GoogleIcon: FC<GoogleIconProps> = ({ className }) => (
  <img src="/integrations/icon-google.svg" alt="" width={16} height={16} className={className} />
);
