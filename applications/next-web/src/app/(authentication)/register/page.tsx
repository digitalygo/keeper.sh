import type { FC } from "react"
import { FlexColumnGroup } from "@/components/flex-column-group"
import { Heading1 } from "@/components/heading"
import { Copy } from "@/components/copy"
import { AuthForm } from "@/compositions/auth-form/auth-form"
import { OAuthLinkButton } from "@/compositions/auth-form/components/oauth-link-button"
import { OAuthLinkButtonIcon } from "@/compositions/auth-form/components/oauth-link-button-icon"
import { OAuthLinkButtonText } from "@/compositions/auth-form/components/oauth-link-button-text"
import { AuthFormDivider } from "@/compositions/auth-form/components/auth-form-divider"
import { EmailForm } from "@/compositions/auth-form/components/email-form"
import { AuthFormFooter } from "@/compositions/auth-form/components/auth-form-footer"
import { AuthFormFooterText } from "@/compositions/auth-form/components/auth-form-footer-text"
import { AuthFormFooterLink } from "@/compositions/auth-form/components/auth-form-footer-link"

const RegisterPage: FC = () => {
  return (
    <main className="flex size-full items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <FlexColumnGroup className="gap-2">
          <FlexColumnGroup className="py-2 items-center text-center">
            <Heading1>Create your account</Heading1>
            <Copy>Get started, and sync your calendars within minutes</Copy>
          </FlexColumnGroup>
          <AuthForm>
            <OAuthLinkButton href="/auth/google">
              <OAuthLinkButtonIcon src="/integrations/icon-google.svg" />
              <OAuthLinkButtonText>Sign up with Google</OAuthLinkButtonText>
            </OAuthLinkButton>
            <OAuthLinkButton href="/auth/outlook">
              <OAuthLinkButtonIcon src="/integrations/icon-outlook.svg" />
              <OAuthLinkButtonText>Sign up with Outlook</OAuthLinkButtonText>
            </OAuthLinkButton>
            <AuthFormDivider>or</AuthFormDivider>
            <EmailForm submitButtonText="Sign up" />
            <AuthFormFooter>
              <AuthFormFooterText>Already have an account?</AuthFormFooterText>
              <AuthFormFooterLink href="/login">Sign in</AuthFormFooterLink>
            </AuthFormFooter>
          </AuthForm>
        </FlexColumnGroup>
      </div>
    </main>
  )
}

export default RegisterPage;
