import NoteList from "@/components/note/NoteList";
import { RequireAuth } from "@/components/utils";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <div className="flex">
        <div className="w-[30%]">
          <NoteList />
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
