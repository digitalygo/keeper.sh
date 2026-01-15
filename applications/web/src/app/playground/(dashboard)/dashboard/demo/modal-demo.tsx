"use client";

import { useState } from "react";
import { Button, ButtonText, Modal, Copy, Heading3 } from "@keeper.sh/ui";

const ModalDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <ButtonText>Open Modal</ButtonText>
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Heading3>Example Modal</Heading3>
        <Copy>This is an example modal. On desktop it appears centered, on mobile it slides up from the bottom as a sheet.</Copy>
      </Modal>
    </>
  );
};

export { ModalDemo };
