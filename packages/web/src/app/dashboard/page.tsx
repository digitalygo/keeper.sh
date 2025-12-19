import { Header } from "@/components/header";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.description}>Welcome to your dashboard.</p>
      </main>
    </>
  );
}
