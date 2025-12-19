"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import { useAuth } from "@/components/auth-provider";
import { Toast } from "@/components/toast-provider";
import {
  EditNameDialog,
  ChangePasswordDialog,
  DeleteAccountDialog,
} from "@/components/settings-dialogs";
import { SectionHeader } from "@/components/section-header";
import { updateUser, changePassword, deleteAccount, signOut } from "@/lib/auth";
import {
  button,
  settingsSection,
  settingsCard,
  settingsLabel,
  settingsValue,
} from "@/styles";
import { DangerLabel, DangerText } from "@/components/typography";

export default function SettingsPage() {
  const { user, refresh } = useAuth();
  const router = useRouter();
  const toastManager = Toast.useToastManager();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleUpdateName = async (name: string) => {
    await updateUser({ name });
    await refresh();
    toastManager.add({ title: "Name updated" });
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    await changePassword(currentPassword, newPassword);
    toastManager.add({ title: "Password changed" });
  };

  const handleDeleteAccount = async (password: string) => {
    await deleteAccount(password);
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col gap-8">
      <section className={settingsSection()}>
        <SectionHeader
          title="Profile"
          description="Manage your personal information"
        />

        <div className={settingsCard()}>
          <div className="flex items-center justify-between">
            <div>
              <div className={settingsLabel()}>Display Name</div>
              <div className={settingsValue()}>{user?.name || "Not set"}</div>
            </div>
            <Button
              onClick={() => setIsEditingName(true)}
              className={button({ variant: "secondary" })}
            >
              Edit
            </Button>
          </div>
          <Separator className="bg-gray-200 h-px" />
          <div>
            <div className={settingsLabel()}>Username</div>
            <div className={settingsValue()}>{user?.username}</div>
          </div>
        </div>
      </section>

      <section className={settingsSection()}>
        <SectionHeader
          title="Security"
          description="Manage your password and account security"
        />

        <div className={settingsCard()}>
          <div className="flex items-center justify-between">
            <div>
              <div className={settingsLabel()}>Password</div>
              <div className={settingsValue()}>••••••••</div>
            </div>
            <Button
              onClick={() => setIsChangingPassword(true)}
              className={button({ variant: "secondary" })}
            >
              Change
            </Button>
          </div>
        </div>
      </section>

      <section className={settingsSection()}>
        <SectionHeader
          title="Danger Zone"
          description="Irreversible actions for your account"
        />

        <div className="flex flex-col gap-4 p-4 border border-red-300 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <DangerLabel as="div">Delete Account</DangerLabel>
              <DangerText as="div">
                Permanently delete your account and all data
              </DangerText>
            </div>
            <Button
              onClick={() => setIsDeletingAccount(true)}
              className={button({ variant: "danger" })}
            >
              Delete
            </Button>
          </div>
        </div>
      </section>

      <EditNameDialog
        open={isEditingName}
        onOpenChange={setIsEditingName}
        initialName={user?.name ?? ""}
        onSave={handleUpdateName}
      />

      <ChangePasswordDialog
        open={isChangingPassword}
        onOpenChange={setIsChangingPassword}
        onSave={handleChangePassword}
      />

      <DeleteAccountDialog
        open={isDeletingAccount}
        onOpenChange={setIsDeletingAccount}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
}
