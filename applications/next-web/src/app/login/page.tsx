import type { FC } from "react"
import { FlexColumnGroup } from "@/components/flex-column-group"
import { Heading1 } from "@/components/heading"
import { Copy } from "@/components/copy"
import { AuthForm } from "@/compositions/auth-form/auth-form"

const LoginPage: FC = () => {
  return (
    <main className="flex size-full items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-xs">
        <FlexColumnGroup className="gap-2">
          <FlexColumnGroup className="py-2 items-center text-center">
            <Heading1>Welcome back</Heading1>
            <Copy>Sign in to your Keeper account to continue</Copy>
          </FlexColumnGroup>
          <AuthForm
            submitButtonText="Sign in"
            footerText="No account yet?"
            footerLinkText="Register"
            footerLinkHref="/blayground/register"
          />
        </FlexColumnGroup>
      </div>
    </main>
  )
}

export default LoginPage;
