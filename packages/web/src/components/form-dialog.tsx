"use client";

import type { FC, PropsWithChildren } from "react";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { button, dialogPopup } from "@/styles";
import { CardTitle, TextBody, DangerText } from "@/components/typography";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  size: "sm" | "md" | "lg";
  error: string | null;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  submitVariant: "primary" | "danger";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  trigger?: React.ReactElement;
}

export const FormDialog: FC<PropsWithChildren<FormDialogProps>> = ({
  open,
  onOpenChange,
  title,
  description,
  size,
  children,
  error,
  isSubmitting,
  submitLabel,
  submittingLabel,
  submitVariant,
  onSubmit,
  trigger,
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {trigger && <Dialog.Trigger render={trigger} />}
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/40 z-50" />
      <Dialog.Popup className={dialogPopup({ size })}>
        <Dialog.Title render={<CardTitle />}>{title}</Dialog.Title>
        <Dialog.Description render={<TextBody className="mt-1 mb-3" />}>
          {description}
        </Dialog.Description>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {children}
          {error && (
            <DangerText as="p" className="text-xs">
              {error}
            </DangerText>
          )}
          <div className="flex gap-2 justify-end">
            <Dialog.Close className={button({ variant: "secondary", size: "sm" })}>
              Cancel
            </Dialog.Close>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={button({ variant: submitVariant, size: "sm" })}
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
        </form>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
);
