"use client";

import Link from "next/link";
import css from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NotFound() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist. Redirect on home
        page.
      </p>
      <Link href="/" className={css.link}>
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
