import Link from "next/link";
import { AuthNav } from "@/components/auth-nav/auth-nav";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Keeper
        </Link>
        <AuthNav />
      </div>
    </header>
  );
}
