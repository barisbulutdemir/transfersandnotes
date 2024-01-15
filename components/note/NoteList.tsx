'use client';
// NotesComponent.tsx
import React, { useEffect } from 'react';
import { fetchNotes } from '@/redux/services/notesSlice';  // apiSlice.ts dosyasının konumunu gösterir
import { useAppDispatch, useAppSelector } from '@/redux/hooks';  // hooks dosyasının konumunu gösterir
import { Label } from '../ui/label';
import Link from 'next/link';
import { htmlToText } from '../utils/htmlToText';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  natural_created_at: string; // Eklenen yeni alan
}

const NoteList: React.FC = () => { 
  const dispatch = useAppDispatch();
  const { notes, status } = useAppSelector((state) => ({
    notes: state.notes.notes,
    status: state.notes.status,
  }));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  return (
    <div className='w-full'>
      <div className='grid gap-4 py-10 px-10'>
        {notes.map((note) => (
          <Link href={`/notes/${note.id}`} key={note.id}>
            <p className='border border-slate-900 p-2 shadow-neo h-[120px]'>
              <Label className='font-bold text-lg line-clamp-1'>{note.title}</Label>
              <p className='text-sm mt-2 line-clamp-2'>{htmlToText(note.content)}</p>
              <small className='capitalize italic text-slate-700 text-xs'> Created: {note.natural_created_at}</small>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NoteList);
