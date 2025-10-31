"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NoteDetails.module.css";
import Loader from "@/app/loading";
import Error from "./error";
import { Note } from "@/types/note";

function NoteDetailes() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isError,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString("en-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleGoBack = () => {
    const isSure = confirm("Are you sure?");
    if (isSure) {
      router.back();
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Error error={error} />}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formatDate(note.createdAt)}</p>
            <button className={css.button} onClick={handleGoBack}>
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteDetailes;
