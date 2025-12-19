"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@base-ui-components/react/button";
import { getSession, signOut } from "@/lib/auth";
import styles from "./header.module.css";

export function AuthNav() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      setIsLoggedIn(!!session?.user);
      setIsLoading(false);
    });
  }, []);

  async function handleLogout() {
    await signOut();
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  }

  if (isLoading) {
    return <nav className={styles.nav} />;
  }

  if (isLoggedIn) {
    return (
      <nav className={styles.nav}>
        <Button onClick={handleLogout} className={styles.buttonSecondary}>
          Logout
        </Button>
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      <Button
        render={<Link href="/login" />}
        nativeButton={false}
        className={styles.buttonSecondary}
      >
        Login
      </Button>
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        className={styles.buttonPrimary}
      >
        Register
      </Button>
    </nav>
  );
}
