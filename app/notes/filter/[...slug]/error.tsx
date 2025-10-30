"use client";

import css from "../../../ErrorMessage.module.css";

interface ErrorProps {
  error: Error;
}
export default function Error({ error }: ErrorProps) {
  return (
    <p className={css.text}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
}
