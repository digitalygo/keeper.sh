import type { FC, PropsWithChildren } from "react"
import { AuthFormDivider } from "./components/auth-form-divider"
import { AuthFormFooter } from "./components/auth-form-footer"
import { AuthFormFooterLink } from "./components/auth-form-footer-link"
import { AuthFormFooterText } from "./components/auth-form-footer-text"
import { EmailForm } from "./components/email-form"
import { OAuthLinkButton } from "./components/oauth-link-button"
import { OAuthLinkButtonIcon } from "./components/oauth-link-button-icon"
import { OAuthLinkButtonText } from "./components/oauth-link-button-text"
import { Provider } from "jotai/react"

export const AuthFormSignIn: FC = () => {
  return (
    <Provider>
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
    </Provider>
  )
}
