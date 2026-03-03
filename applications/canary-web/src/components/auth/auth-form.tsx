import { useRef, type FormEvent, type ChangeEvent, type Ref } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAtomValue, useSetAtom, useStore } from "jotai";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import {
  authFormStatusAtom,
  authFormErrorAtom,
  authFormStepAtom,
  authFormEmailAtom,
  type AuthFormStatus,
} from "../../state/auth-form";
import { signInWithEmail, signUpWithEmail } from "../../lib/auth";
import { Button, LinkButton, ButtonText, ButtonIcon } from "../ui/button";
import { Divider } from "../ui/divider";
import { Heading2 } from "../ui/heading";
import { Input } from "../ui/input";
import { Text } from "../ui/text";

export type AuthScreenCopy = {
  heading: string;
  subtitle: string;
  oauthActionLabel: string;
  submitLabel: string;
  switchPrompt: string;
  switchCta: string;
  switchTo: "/login" | "/register";
  action: "signIn" | "signUp";
};

type SocialAuthProvider = {
  id: string;
  label: string;
  to: "/auth/google" | "/auth/outlook";
  iconSrc: string;
};

const SOCIAL_AUTH_PROVIDERS: readonly SocialAuthProvider[] = [
  { id: "google", label: "Google", to: "/auth/google", iconSrc: "/integrations/icon-google.svg" },
  { id: "outlook", label: "Outlook", to: "/auth/outlook", iconSrc: "/integrations/icon-outlook.svg" },
];

const submitTextVariants: Record<AuthFormStatus, Variants[string]> = {
  idle: { opacity: 1, filter: "none", y: 0, scale: 1 },
  loading: { opacity: 0, filter: "blur(2px)", y: -2, scale: 0.75 },
};

const backButtonVariants: Variants = {
  hidden: { width: 0, opacity: 0, filter: "blur(2px)" },
  visible: { width: "auto", opacity: 1, filter: "blur(0px)" },
};

export function AuthForm({ copy }: { copy: AuthScreenCopy }) {
  return (
    <>
      <div className="flex flex-col py-2">
        <Heading2 as="span" className="text-center">{copy.heading}</Heading2>
        <Text size="sm" tone="muted" align="center">{copy.subtitle}</Text>
      </div>
      <SocialAuthButtons oauthActionLabel={copy.oauthActionLabel} />
      <Divider>or</Divider>
      <EmailForm submitLabel={copy.submitLabel} action={copy.action} />
      <div className="flex flex-col gap-1.5">
        <AuthError />
        <Text size="sm" tone="muted" align="center">
          {copy.switchPrompt}{" "}
          <Link to={copy.switchTo} className="text-foreground underline underline-offset-2 hover:text-foreground-muted transition-colors">
            {copy.switchCta}
          </Link>
        </Text>
      </div>
    </>
  );
}

function SocialAuthButtons({ oauthActionLabel }: { oauthActionLabel: string }) {
  return (
    <>
      {SOCIAL_AUTH_PROVIDERS.map((provider) => (
        <LinkButton key={provider.id} to={provider.to} className="w-full justify-center" variant="border">
          <ButtonIcon>
            <img src={provider.iconSrc} alt="" width={16} height={16} />
          </ButtonIcon>
          <ButtonText>{`${oauthActionLabel} with ${provider.label}`}</ButtonText>
        </LinkButton>
      ))}
    </>
  );
}

function EmailForm({ submitLabel, action }: { submitLabel: string; action: "signIn" | "signUp" }) {
  const navigate = useNavigate();
  const store = useStore();
  const step = useAtomValue(authFormStepAtom);
  const setStep = useSetAtom(authFormStepAtom);
  const setStatus = useSetAtom(authFormStatusAtom);
  const setError = useSetAtom(authFormErrorAtom);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = store.get(authFormEmailAtom);

    if (step === "email") {
      if (!email) return;
      setStep("password");
      requestAnimationFrame(() => passwordRef.current?.focus());
      return;
    }

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    if (!password || typeof password !== "string") return;

    setStatus("loading");
    try {
      if (action === "signIn") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      setStatus("idle");
      if (action === "signUp") {
        sessionStorage.setItem("pendingVerificationEmail", email);
        navigate({ to: "/verify-email" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (error) {
      setStatus("idle");
      setError({
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        active: true,
      });
    }
  };

  const handleBack = () => {
    setStep("email");
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="flex flex-col gap-1.5">
        <EmailInput disabled={step === "password"} />
        <AnimatePresence>
          {step === "password" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <PasswordInput ref={passwordRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-stretch">
        {step === "password" ? (
          <StepBackButton onBack={handleBack} />
        ) : (
          <BackButton />
        )}
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}

function AuthError() {
  const error = useAtomValue(authFormErrorAtom);
  const active = error?.active;

  return (
    <motion.div
      className="overflow-hidden"
      initial={false}
      animate={{
        height: active ? "auto" : 0,
        opacity: active ? 1 : 0,
        filter: active ? "blur(0px)" : "blur(4px)",
      }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-sm tracking-tight text-destructive text-center">
        {error?.message}
      </p>
    </motion.div>
  );
}

function EmailInput({ disabled }: { disabled?: boolean }) {
  const status = useAtomValue(authFormStatusAtom);
  const email = useAtomValue(authFormEmailAtom);
  const setEmail = useSetAtom(authFormEmailAtom);
  const error = useAtomValue(authFormErrorAtom);
  const setError = useSetAtom(authFormErrorAtom);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error?.active) {
      setError({ ...error, active: false });
    }
  };

  return (
    <Input
      id="email"
      name="email"
      value={email}
      disabled={disabled || status === "loading"}
      type="email"
      placeholder="johndoe+keeper@example.com"
      tone={error?.active ? "error" : "neutral"}
      onChange={handleChange}
    />
  );
}

function PasswordInput({ ref }: { ref?: Ref<HTMLInputElement> }) {
  const status = useAtomValue(authFormStatusAtom);
  const error = useAtomValue(authFormErrorAtom);
  const setError = useSetAtom(authFormErrorAtom);

  const handleChange = () => {
    if (error?.active) {
      setError({ ...error, active: false });
    }
  };

  return (
    <Input
      ref={ref}
      id="password"
      name="password"
      disabled={status === "loading"}
      type="password"
      placeholder="Password"
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

function StepBackButton({ onBack }: { onBack: () => void }) {
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
          <Button type="button" variant="border" className="self-stretch justify-center mr-2" onClick={onBack}>
            <ButtonIcon>
              <ArrowLeft size={16} />
            </ButtonIcon>
          </Button>
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
