import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components';
import type { Note } from '@/models/note.model';
import { deleteNote, getNoteById } from '@/services/notesServices';
import type { RootState } from '@/store/store';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateNote } from './components/CreateNote';
import { ViewNoteDetail } from './components/ViewNoteDetails';
import { EditNote } from './components/EditNote';

export const NotesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const notes: Note[] = useSelector((state: RootState) => state.notes.notes) || [];

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { noteId } = useParams();

  useEffect(() => {
    console.log({ noteId });
  }, [noteId]);

  const openNoteDetail = (noteId: string) => {
    getNoteById(dispatch, noteId);
    setOpen(true);
    setOpenEdit(false);
  };

  const openEditNote = (noteId: string) => {
    getNoteById(dispatch, noteId);
    setOpenEdit(true);
    setOpen(false);
  };

  const deleteNoteHandler = (noteId: string) => {
    deleteNote(dispatch, noteId);
    setOpen(false);
    setOpenEdit(false);
  };

  return (
    <section className="flex flex-col w-full h-full p-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl mb-8">{t('title')}</h1>
        <div className="hover:animate-shake">
          <CreateNote />
        </div>
      </div>

      <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="w-full hover:animate-tada hover:cursor-pointer group">
            <CardHeader className="flex flex-row justify-between items-center ">
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden whitespace-nowrap overflow-ellipsis">{note.content}</CardContent>
            <CardFooter className="flex flex-row justify-end items-center invisible group-hover:visible">
              <Button variant="ghost" size="icon" className="p-2" onClick={() => openNoteDetail(note.id)}>
                <Eye size={24} />
              </Button>
              <Button variant="ghost" size="icon" className="p-2" onClick={() => openEditNote(note.id)}>
                <Pencil size={24} />
              </Button>
              <Button variant="ghost" size="icon" className="p-2 " onClick={() => deleteNoteHandler(note.id)}>
                <Trash2 size={24} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </article>

      <EditNote open={openEdit} />
      <ViewNoteDetail open={open} />
    </section>
  );
};
