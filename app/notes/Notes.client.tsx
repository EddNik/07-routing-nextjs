// App.tsx
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { getNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import toast from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import Error from "./error";
import Loader from "../loading";

interface NotesClientProps {
  tag?: NoteTag | "Choose";
}

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", page, debouncedQuery, tag],
    queryFn: () => getNotes(debouncedQuery, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isSuccess && data.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data, isSuccess]);

  function handleQuery(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox setQuery={handleQuery} query={query} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              setPage={setPage}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
      </div>
      <main>
        {isLoading && <Loader />}
        {isError && <Error error={error} />}
        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
    </>
  );
}

export default NotesClient;
