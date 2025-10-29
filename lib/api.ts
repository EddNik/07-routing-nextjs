import { NewNote, Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// axios.defaults.baseURL = "https://next-docs-9f0504b0a741.herokuapp.com/";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

const api = axios.create({ headers: { Authorization: `Bearer ${API_TOKEN}` } });

// axios.create()
// Creates a custom Axios instance with default configuration that applies to all requests made with this instance. This is better than using the global axios object because you can have multiple configured instances for different APIs.

export async function getNotes(
  query: string,
  page?: number,
  tag?: string
): Promise<GetNotesResponse> {
  const options = {
    params: {
      page: page || 1,
      perPage: 12,
      ...(query.trim() !== "" && { search: query.trim() }),
      // search: query.trim(),
      tag,
    },
    // headers: { Authorization: `Bearer ${API_TOKEN}` },
  };
  try {
    const response = await api.get<GetNotesResponse>("/notes", options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(newNote: NewNote): Promise<Note> {
  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${API_TOKEN}`,
  //     },
  //   };

  try {
    const response = await api.post<Note>("/notes", newNote);
    // const response = await axios.post<Note>("/notes", newNote, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${API_TOKEN}`,
  //     },
  //   };

  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${API_TOKEN}`,
  //     },
  //   };

  try {
    const response = await api.get<Note>(`/notes/${id}`);
    // const response = await axios.get<Note>(`/notes/${id}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}
