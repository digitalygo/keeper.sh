"use client";

import { useState } from "react";
import { Button } from "@base-ui/react/button";
import { Toast } from "@/components/toast-provider";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { useIcalToken } from "@/hooks/use-ical-token";
import { button, input } from "@/styles";
import { Check } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const ICalLinkSection = () => {
  const toastManager = Toast.useToastManager();
  const { token, isLoading } = useIcalToken();
  const [copied, setCopied] = useState(false);

  const icalUrl = token
    ? new URL(`/cal/${token}.ics`, BASE_URL).toString()
    : "";

  const copyToClipboard = async () => {
    if (!icalUrl) return;
    await navigator.clipboard.writeText(icalUrl);
    toastManager.add({ title: "Copied to clipboard" });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Section>
      <SectionHeader
        title="Your iCal Link"
        description="Subscribe to this link to view your aggregated events"
      />
      <div className="flex gap-1.5">
        <input
          type="text"
          value={isLoading ? "Loading..." : icalUrl}
          readOnly
          className={input({ readonly: true, size: "sm", className: "flex-1" })}
        />
        <Button
          onClick={copyToClipboard}
          disabled={isLoading || !token}
          className={button({
            variant: "secondary",
            size: "sm",
            className: "relative",
          })}
        >
          <span className={copied ? "invisible" : ""}>Copy</span>
          {copied && <Check size={16} className="absolute inset-0 m-auto" />}
        </Button>
      </div>
    </Section>
  );
};
