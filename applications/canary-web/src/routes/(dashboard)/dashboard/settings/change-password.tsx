import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { LinkButton, Button, ButtonIcon, ButtonText } from "../../../../components/ui/button";
import { Divider } from "../../../../components/ui/divider";
import { Input } from "../../../../components/ui/input";
import { changePassword } from "../../../../lib/auth";

export const Route = createFileRoute(
  "/(dashboard)/dashboard/settings/change-password",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const current = formData.get("current");
    const newPassword = formData.get("new");
    const confirm = formData.get("confirm");

    if (typeof current !== "string" || typeof newPassword !== "string" || typeof confirm !== "string") return;

    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await changePassword(current, newPassword);
      navigate({ to: "/dashboard/settings" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to change password.");
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <LinkButton to="/dashboard/settings" variant="elevated" size="compact" className="aspect-square">
        <ButtonIcon>
          <ArrowLeft size={16} />
        </ButtonIcon>
      </LinkButton>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Input name="current" type="password" placeholder="Current password" tone={error ? "error" : "neutral"} />
          <Input name="new" type="password" placeholder="New password" tone={error ? "error" : "neutral"} />
          <Input name="confirm" type="password" placeholder="Confirm new password" tone={error ? "error" : "neutral"} />
        </div>
        {error && <p className="text-sm tracking-tight text-destructive">{error}</p>}
        <Divider />
        <Button type="submit" variant="highlight" className="w-full justify-center">
          <ButtonText>Save</ButtonText>
        </Button>
      </form>
    </div>
  );
}
