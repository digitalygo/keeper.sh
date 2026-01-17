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

const LoginPage: FC = () => {
  return (
    <main className="flex size-full items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <FlexColumnGroup className="gap-2">
          <FlexColumnGroup className="py-2 items-center text-center">
            <Heading1>Welcome back</Heading1>
            <Copy>Sign in to your Keeper account to continue</Copy>
          </FlexColumnGroup>
          <AuthForm>
            <OAuthLinkButton href="/auth/google">
              <OAuthLinkButtonIcon src="/integrations/icon-google.svg" />
              <OAuthLinkButtonText>Sign in with Google</OAuthLinkButtonText>
            </OAuthLinkButton>
            <OAuthLinkButton href="/auth/outlook">
              <OAuthLinkButtonIcon src="/integrations/icon-outlook.svg" />
              <OAuthLinkButtonText>Sign in with Outlook</OAuthLinkButtonText>
            </OAuthLinkButton>
            <AuthFormDivider>or</AuthFormDivider>
            <EmailForm submitButtonText="Sign in" />
            <AuthFormFooter>
              <AuthFormFooterText>No account yet?</AuthFormFooterText>
              <AuthFormFooterLink href="/register">Register</AuthFormFooterLink>
            </AuthFormFooter>
          </AuthForm>
        </FlexColumnGroup>
      </div>
    </main>
  )
}

export default LoginPage;
