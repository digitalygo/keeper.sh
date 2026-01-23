"use client";

import type { FC, FormEvent } from "react";
import { FlexRowGroup } from "@/components/flex-row-group";
import { FlexColumnGroup } from "@/components/flex-column-group";
import { Button, LinkButton } from "@/components/button";
import { Input } from "@/components/input";
import { Divider } from "@/components/divider";
import { ArrowLeft } from "lucide-react";

type ICSFeedConnectFormProps = {
  backHref?: string;
};

export const ICSFeedConnectForm: FC<ICSFeedConnectFormProps> = ({
  backHref = "/dashboard/accounts/connect"
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const feedUrl = formData.get("feedUrl");

    // TODO: Handle form submission
    console.log({ feedUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <Input
        type="url"
        id="feedUrl"
        name="feedUrl"
        required
        placeholder="Calendar Feed URL"
      />

      <Divider />

      <FlexRowGroup className="items-stretch">
        <LinkButton href={backHref} variant="border" size="normal" className="px-3.5 mr-2">
          <ArrowLeft size={17} />
        </LinkButton>
        <Button type="submit" className="w-full" variant="primary" size="normal">
          Subscribe
        </Button>
      </FlexRowGroup>
    </form>
  );
};
