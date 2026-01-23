"use client";

import type { FC, FormEvent } from "react";
import { FlexRowGroup } from "@/components/flex-row-group";
import { FlexColumnGroup } from "@/components/flex-column-group";
import { Button, LinkButton } from "@/components/button";
import { Input } from "@/components/input";
import { Divider } from "@/components/divider";
import { ArrowLeft } from "lucide-react";

type GenericCalDAVConnectFormProps = {
  backHref?: string;
};

export const GenericCalDAVConnectForm: FC<GenericCalDAVConnectFormProps> = ({
  backHref = "/dashboard/accounts/connect"
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const serverUrl = formData.get("serverUrl");
    const username = formData.get("username");
    const password = formData.get("password");

    // TODO: Handle form submission
    console.log({ serverUrl, username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <FlexColumnGroup className="gap-2">
        <Input
          type="url"
          id="serverUrl"
          name="serverUrl"
          required
          placeholder="CalDAV Server URL"
        />
        <Input
          type="text"
          id="username"
          name="username"
          required
          placeholder="CalDAV Server Username"
        />
        <Input
          type="password"
          id="password"
          name="password"
          required
          placeholder="CalDAV Server Password"
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
