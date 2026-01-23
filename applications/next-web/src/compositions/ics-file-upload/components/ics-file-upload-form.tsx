"use client";

import type { FC, FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { FlexRowGroup } from "@/components/flex-row-group";
import { Button, LinkButton } from "@/components/button";
import { Divider } from "@/components/divider";
import { Copy } from "@/components/copy";
import { ArrowLeft, Upload } from "lucide-react";

type ICSFileUploadFormProps = {
  backHref?: string;
};

export const ICSFileUploadForm: FC<ICSFileUploadFormProps> = ({
  backHref = "/dashboard/accounts/connect"
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("icsFile");

    // TODO: Handle form submission
    console.log({ file });
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <label
        htmlFor="icsFile"
        className="w-full flex items-center justify-center gap-2 py-8 px-4 rounded-xl border border-dashed border-border hover:border-foreground-muted transition-colors cursor-pointer"
      >
        <Upload size={20} className="text-foreground-muted" />
        <Copy className="text-foreground-muted">
          {selectedFile ? selectedFile.name : "Upload an ICS File"}
        </Copy>
        <input
          type="file"
          id="icsFile"
          name="icsFile"
          accept=".ics,.ical"
          required
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <Divider />

      <FlexRowGroup className="items-stretch">
        <LinkButton href={backHref} variant="border" size="normal" className="px-3.5 mr-2">
          <ArrowLeft size={17} />
        </LinkButton>
        <Button type="submit" className="w-full" variant="primary" size="normal">
          Upload
        </Button>
      </FlexRowGroup>
    </form>
  );
};
