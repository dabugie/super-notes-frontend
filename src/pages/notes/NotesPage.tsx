import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';
import type { Note } from '@/models/note.model';
import { deleteNote, getNoteById } from '@/services/notesServices';
import type { RootState } from '@/store/store';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateNote } from './components/CreateNote';
import { ViewNoteDetail } from './components/ViewNoteDetails';

export const NotesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const notes: Note[] = useSelector((state: RootState) => state.notes.notes) || [];

  const [open, setOpen] = useState(false);

  const { noteId } = useParams();

  useEffect(() => {
    console.log({ noteId });
  }, [noteId]);

  const openNoteDetail = (noteId: string) => {
    getNoteById(dispatch, noteId);
    setOpen(true);
  };

  const deleteNoteHandler = (noteId: string) => {
    deleteNote(dispatch, noteId);
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
          <Card
            key={note.id}
            className="w-full hover:animate-tada hover:cursor-pointer group"
            onClick={() => openNoteDetail(note.id)}
          >
            <CardHeader className="flex flex-row justify-between items-center ">
              <CardTitle>{note.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 invisible group-hover:visible"
                onClick={() => deleteNoteHandler(note.id)}
              >
                <Trash2 size={24} />
              </Button>
            </CardHeader>
            <CardContent className="overflow-hidden whitespace-nowrap overflow-ellipsis">{note.content}</CardContent>
          </Card>
        ))}
      </article>

      <ViewNoteDetail open={open} setOpen={setOpen} />
    </section>
  );
};
