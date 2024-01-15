"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchNote, updateNote } from "@/redux/services/notesSlice";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import "react-quill/dist/quill.snow.css";
import { useDebounce } from "@/hooks/useDebounce";
import dynamic from "next/dynamic";
import { modules } from "../utils/QuillModule";
import { Button } from "../ui/button";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false } // Bu, ReactQuill bileşeninin yalnızca tarayıcıda render edileceğini belirtir
);

interface NoteType {
  id: number;
  title: string;
  content: string;
}
type Props = {};

const NotePage = (props: Props) => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const dispatch = useAppDispatch();

  const note = useAppSelector(
    (state: RootState) => state.notes.currentNote
  ) as NoteType;

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (id) {
      const noteId = parseInt(id as string, 10);
      dispatch(fetchNote(noteId));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleUpdateNote = () => {
    if (note) {
      dispatch(updateNote({ id: note.id, title, content: content }));
    }
  };
  const autoSave = useDebounce(content, 3000);

  useEffect(() => {
    if (note && autoSave && autoSave !== note.content) {
      // Sadece içerik değiştiğinde güncelle
      dispatch(updateNote({ id: note.id, title, content: autoSave }));
    }
  }, [autoSave, dispatch, note, title]);


  return (
    <>
      <div className="min-h-screen grainy p-8">
        <div className="max-w-4xl mx-auto">
          <div className=" shadow-xl border-stone-200">
            <div className="flex justify-between py-4 px-2">
              <input className="text-xl grow outline-none px-2" value={title} onChange={(e) => setTitle(e.target.value)} />

              <Button onClick={handleUpdateNote}>Update Note</Button>
            </div>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotePage;
