import type { FC, PropsWithChildren } from "react";

const ConnectAccountLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full">
      {children}
    </div>
  );
};

export default ConnectAccountLayout;
