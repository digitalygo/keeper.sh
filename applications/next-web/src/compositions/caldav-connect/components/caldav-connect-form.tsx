"use client";

import type { FC, FormEvent } from "react";
import { FlexRowGroup } from "@/components/flex-row-group";
import { FlexColumnGroup } from "@/components/flex-column-group";
import { Button, LinkButton } from "@/components/button";
import { Input } from "@/components/input";
import { Divider } from "@/components/divider";
import { Copy } from "@/components/copy";
import { ArrowLeft } from "lucide-react";

type CalDAVProvider = "fastmail" | "icloud";

type CalDAVConnectFormProps = {
  provider: CalDAVProvider;
  backHref?: string;
};

export const CalDAVConnectForm: FC<CalDAVConnectFormProps> = ({
  provider,
  backHref = "/dashboard/accounts/connect"
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // TODO: Handle form submission
    console.log({ provider, email, password });
  };

  const emailPlaceholder = provider === "fastmail" ? "Fastmail Email Address" : "Apple ID";

  return (
    <form onSubmit={handleSubmit} className="contents">
      <FlexColumnGroup className="gap-2">
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder={emailPlaceholder}
        />
        <Input
          type="password"
          id="password"
          name="password"
          required
          placeholder="App-Specific Password"
        />
      </FlexColumnGroup>

      <Divider />

      <FlexRowGroup className="items-stretch">
        <LinkButton href={backHref} variant="border" size="normal" className="px-3.5 mr-2">
          <ArrowLeft size={17} />
        </LinkButton>
        <Button type="submit" className="w-full" variant="primary" size="normal">
          Connect
        </Button>
      </FlexRowGroup>
    </form>
  );
};
