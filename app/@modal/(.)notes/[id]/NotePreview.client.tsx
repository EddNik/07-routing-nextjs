"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const onClose = () => {
    router.push("/");
    setIsModalOpen(false);
    //   router.back();
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString("en-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={onClose}>
          {isLoading && <p>Loading, please wait...</p>}
          {isError && <p>Something went wrong.</p>}
          <div className={css.container}>
            {note && (
              <div className={css.item}>
                <div className={css.header}>
                  <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.createdAt}</p>
                <p className={css.date}>{formatDate(note.createdAt)}</p>
              </div>
            )}
            <button
              onClick={onClose}
              type="button"
              className={css.cancelButton}
            >
              Back
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default NotePreviewClient;
