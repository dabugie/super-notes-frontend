import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import type { Note } from '@/models/note.model';
import type { RootState } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const NotesPage = () => {
  const { t } = useTranslation();

  const notes: Note[] = useSelector((state: RootState) => state.notes.notes);

  return (
    <section className="flex flex-col w-full h-full p-8">
      <h1 className="text-3xl mb-8">{t('title')}</h1>

      <article className="flex flex-row gap-4">
        <Card className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-32 h-32">
            <PlusCircle className="w-10 h-10" />
          </div>
        </Card>
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>{note.content}</CardContent>
          </Card>
        ))}
      </article>
    </section>
  );
};
