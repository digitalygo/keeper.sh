import type { ReactNode, FormEvent } from "react";
import { ArrowLeft, ArrowLeftRight, Check } from "lucide-react";
import KeeperLogo from "../../assets/keeper.svg?react";
import { authClient } from "../../lib/auth-client";
import { Heading2 } from "../ui/heading";
import { Text } from "../ui/text";
import { TextLink } from "../ui/text-link";
import { Divider } from "../ui/divider";
import { Button, ButtonText, LinkButton, ButtonIcon } from "../ui/button";

type Provider = "google" | "outlook" | "microsoft-365";

const PROVIDER_LABELS: Record<Provider, string> = {
  google: "Google",
  outlook: "Outlook",
  "microsoft-365": "Microsoft 365",
};

const PERMISSIONS = [
  "See your email address",
  "View a list of your calendars",
  "View events, summaries and details",
  "Add or remove calendar events",
];

const PROVIDER_SOCIAL_MAP: Partial<Record<Provider, string>> = {
  google: "google",
  outlook: "microsoft",
};

interface PreambleLayoutProps {
  provider: Provider;
  backHref: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

function PreambleLayout({ provider, backHref, onSubmit, children }: PreambleLayoutProps) {
  return (
    <>
      <ProviderIconPair>
        <img
          src={`/integrations/icon-${provider}.svg`}
          alt={PROVIDER_LABELS[provider]}
          width={40}
          height={40}
          className="size-full rounded-lg p-3"
        />
      </ProviderIconPair>
      <Heading2 as="h1">Connect {PROVIDER_LABELS[provider]}</Heading2>
      <Text size="sm" tone="muted" align="left">
        Start importing your events and sync them across all your calendars.
      </Text>
      <ul className="flex flex-col gap-1">
        {PERMISSIONS.map((permission) => (
          <li key={permission} className="flex flex-row-reverse justify-between items-center gap-2">
            <Check className="shrink-0 text-foreground-muted" size={16} />
            <Text size="sm" tone="muted" align="left">{permission}</Text>
          </li>
        ))}
      </ul>
      <Divider />
      <form onSubmit={onSubmit} className="contents">
        <div className="flex items-stretch gap-2">
          <LinkButton to={backHref} variant="border" className="self-stretch justify-center px-3.5">
            <ButtonIcon>
              <ArrowLeft size={16} />
            </ButtonIcon>
          </LinkButton>
          <Button type="submit" className="grow justify-center">
            <ButtonText>Connect</ButtonText>
          </Button>
        </div>
      </form>
      {children}
    </>
  );
}

interface AuthOAuthPreambleProps {
  provider: Provider;
  backHref: string;
}

export function AuthOAuthPreamble({ provider, backHref }: AuthOAuthPreambleProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const socialProvider = PROVIDER_SOCIAL_MAP[provider];
    if (!socialProvider) return;
    await authClient.signIn.social({ callbackURL: "/dashboard", provider: socialProvider });
  };

  return (
    <PreambleLayout provider={provider} backHref={backHref} onSubmit={handleSubmit}>
      <TextLink to={backHref}>
        Don&apos;t import my calendars yet, just log me in.
      </TextLink>
    </PreambleLayout>
  );
}

interface LinkOAuthPreambleProps {
  provider: Provider;
  backHref: string;
}

export function LinkOAuthPreamble({ provider, backHref }: LinkOAuthPreambleProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PreambleLayout provider={provider} backHref={backHref} onSubmit={handleSubmit} />
  );
}

export function ProviderIconPair({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 pb-4">
      <div className="size-14 rounded-xl border border-interactive-border shadow-xs p-3 flex items-center justify-center bg-background-inverse">
        <KeeperLogo className="size-full rounded-lg text-foreground-inverse p-1" />
      </div>
      <ArrowLeftRight size={20} className="text-foreground-muted" />
      <div className="size-14 rounded-xl border border-interactive-border shadow-xs p-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
