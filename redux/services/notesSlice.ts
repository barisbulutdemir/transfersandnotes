// apiSlice.ts
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// Notun tipini tanımla
interface Note {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

// Slice'ın durumunu tanımla
interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Durumun başlangıç değeri
const initialState: NotesState = {
  notes: [],
  currentNote: null,
  status: 'idle',
  error: null
};

// Notları asenkron olarak getirme
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get<Note[]>('http://localhost:8001/api/note/notes/', {
    withCredentials: true
  });
  return response.data;
});

// Tek bir notu asenkron olarak getirme
export const fetchNote = createAsyncThunk('notes/fetchNote', async (id: number) => {
  const response = await axios.get<Note>(`http://localhost:8001/api/note/notes/${id}/`, {
    withCredentials: true
  });
  return response.data;
});

// Notu asenkron olarak güncelleme
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, title, content }: { id: number, title: string, content: string }) => {
    const response = await axios.put(`http://localhost:8001/api/note/notes/${id}/`, { title, content }, {
      withCredentials: true
    });
    return response.data;
  }
);

// Notu asenkron olarak kaydetme
export const saveNote = createAsyncThunk('notes/saveNote', async ({ title, content }: { title: string, content: string }) => {
  const response = await axios.post('http://localhost:8001/api/note/notes/', { title, content }, {
    withCredentials: true
  });
  return response.data;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentNote = action.payload;
      })
      .addCase(saveNote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes.push(action.payload);
      })
      .addCase(saveNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateNote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// Basit selector'lar
const selectNotes = (state: RootState) => state.notes.notes;
const selectCurrentNote = (state: RootState) => state.notes.currentNote;

// Memoized selector'lar
export const memoizedSelectNotes = createSelector([selectNotes], notes => notes);
export const memoizedSelectCurrentNote = createSelector([selectCurrentNote], currentNote => currentNote);

// Reducer ve diğer sync actions dışa aktarılır
export default notesSlice.reducer;
