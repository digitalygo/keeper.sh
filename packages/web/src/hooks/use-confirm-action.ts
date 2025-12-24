import { useState } from "react";

interface ConfirmActionState {
  isOpen: boolean;
  isConfirming: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (open: boolean) => void;
  confirm: (action: () => Promise<void>) => Promise<void>;
}

export function useConfirmAction(): ConfirmActionState {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const confirm = async (action: () => Promise<void>) => {
    setIsConfirming(true);
    try {
      await action();
    } finally {
      setIsConfirming(false);
      setIsOpen(false);
    }
  };

  return { isOpen, isConfirming, open, close, setIsOpen, confirm };
}
