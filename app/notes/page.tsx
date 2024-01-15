'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { saveNote } from '@/redux/services/notesSlice';



const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  

  const handleCreateNote = async () => {
    // Varsayılan not verileri
    const defaultData = {
      title: "Yeni Not",
      content: "Not içeriği..."
    };

    try {
      // Notu kaydet
      const resultAction = await dispatch(saveNote(defaultData));
      const newNote = resultAction.payload;
  
      // Yeni notun ID'sini kullanarak belirli bir URL'ye yönlendir
      router.push(`/notes/${newNote.id}`);
    } catch (err) {
      console.error("Not kaydedilemedi:", err);
    }
  };
  

  return (
    <div className=' h-[675px] w-full flex justify-center items-center '>
      <div className=''>
        <Button onClick={handleCreateNote}>

        New Note + 
        </Button>
      </div>
      
    </div>
  )
}

export default Page