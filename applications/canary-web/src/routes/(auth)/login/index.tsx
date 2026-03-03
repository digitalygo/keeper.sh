import { SubmitEvent, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { Provider } from "jotai/react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { authFormStatusAtom, authFormErrorAtom, type AuthFormStatus } from "../../../state/auth-form";
import { Button, LinkButton, ExternalLinkButton, ButtonText, ButtonIcon } from "../../../components/ui/button";
import { Divider } from "../../../components/ui/divider";
import { Heading2 } from "../../../components/ui/heading";
import { Input } from "../../../components/ui/input";
import { Text } from "../../../components/ui/text";

export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent,
});

const submitTextVariants: Record<AuthFormStatus, Variants[string]> = {
  idle: { opacity: 1, filter: "none", y: 0, scale: 1 },
  loading: { opacity: 0, filter: "blur(2px)", y: -2, scale: 0.75 },
};

const backButtonVariants: Variants = {
  hidden: { width: 0, opacity: 0, filter: "blur(2px)" },
  visible: { width: "auto", opacity: 1, filter: "blur(0px)" },
};

function RouteComponent() {
  return (
    <Provider>
      <div className="flex flex-col py-2">
        <Heading2 as="span" className="text-center">Welcome back</Heading2>
        <Text size="sm" tone="muted" align="center">Sign in to your Keeper account</Text>
      </div>
      <ExternalLinkButton href="/auth/google" className="w-full justify-center" variant="border">
        <ButtonIcon>
          <img src="/integrations/icon-google.svg" alt="" width={16} height={16} />
        </ButtonIcon>
        <ButtonText>Sign in with Google</ButtonText>
      </ExternalLinkButton>
      <ExternalLinkButton href="/auth/outlook" className="w-full justify-center" variant="border">
        <ButtonIcon>
          <img src="/integrations/icon-outlook.svg" alt="" width={16} height={16} />
        </ButtonIcon>
        <ButtonText>Sign in with Outlook</ButtonText>
      </ExternalLinkButton>
      <Divider>or</Divider>
      <EmailForm />
      <Text size="sm" tone="muted" align="center">
        Don't have an account yet? <Link to="/register" className="text-foreground underline underline-offset-2 hover:text-foreground-muted transition-colors">Register</Link>
      </Text>
    </Provider>
  );
}

function EmailForm() {
  const setStatus = useSetAtom(authFormStatusAtom);
  const setError = useSetAtom(authFormErrorAtom);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("idle");
      setError({ message: "Invalid email or password. Please try again.", active: true });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <EmailError />
      <EmailInput />
      <div className="flex items-stretch">
        <BackButton />
        <SubmitButton>Sign in</SubmitButton>
      </div>
    </form>
  );
}

function EmailError() {
  const error = useAtomValue(authFormErrorAtom);

  return (
    <AnimatePresence initial={false}>
      {error?.active && (
        <motion.div
          className="overflow-visible flex flex-col justify-end"
          initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
          animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
          exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
        >
          <Text size="sm" tone="default" align="left" className="text-red-500">
            {error.message}
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmailInput() {
  const status = useAtomValue(authFormStatusAtom);
  const error = useAtomValue(authFormErrorAtom);
  const setError = useSetAtom(authFormErrorAtom);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (error?.active) {
      setError({ ...error, active: false });
    }
  };

  return (
    <Input
      ref={ref}
      id="email"
      name="email"
      disabled={status === "loading"}
      type="email"
      placeholder="johndoe+keeper@example.com"
      tone={error?.active ? "error" : "neutral"}
      onChange={handleChange}
    />
  );
}

function BackButton() {
  const status = useAtomValue(authFormStatusAtom);

  return (
    <AnimatePresence initial={false}>
      {status !== "loading" && (
        <motion.div
          className="flex items-stretch"
          variants={backButtonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ width: { duration: 0.24 }, opacity: { duration: 0.12 } }}
        >
          <LinkButton to="/" variant="border" className="self-stretch justify-center mr-2">
            <ButtonIcon>
              <ArrowLeft size={16} />
            </ButtonIcon>
          </LinkButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SubmitButton({ children }: { children: string }) {
  const status = useAtomValue(authFormStatusAtom);

  return (
    <motion.div className="grow" layout>
      <Button disabled={status === "loading"} type="submit" className="relative w-full justify-center">
        <motion.span
          className="origin-top font-medium"
          variants={submitTextVariants}
          animate={status}
          transition={{ duration: 0.16 }}
        >
          {children}
        </motion.span>
        <AnimatePresence>
          {status === "loading" && (
            <motion.span
              className="absolute inset-0 m-auto size-fit origin-bottom"
              initial={{ opacity: 0, filter: "blur(2px)", y: 2, scale: 0.25 }}
              animate={{ opacity: 1, filter: "none", y: 0, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(2px)", y: 2, scale: 0.25 }}
              transition={{ duration: 0.16 }}
            >
              <LoaderCircle className="animate-spin" size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
