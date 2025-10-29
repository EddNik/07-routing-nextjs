"use client";

import css from "./ErrorMessage.module.css";

interface ErrorProps {
  error: Error;
}
export default function Error({ error }: ErrorProps) {
  return (
    <p className={css.text}>
      <p>Could not fetch note details. {error.message}</p>
    </p>
  );
}
