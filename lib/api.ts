import { NewNote, Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

const api = axios.create({ headers: { Authorization: `Bearer ${API_TOKEN}` } });

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
      tag,
    },
  };
  try {
    const response = await api.get<GetNotesResponse>("/notes", options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(newNote: NewNote): Promise<Note> {
  try {
    const response = await api.post<Note>("/notes", newNote);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
