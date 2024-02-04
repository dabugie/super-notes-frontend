import { Button, Card, CardContent, CardHeader, CardTitle, Icons, Input } from '@/components';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Note } from '@/models/note.model';
import type { RootState } from '@/store/store';
import { useState, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const NotesPage = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState('');
  const [note, setNote] = useState({ title: '', content: '' });

  const notes: Note[] = useSelector((state: RootState) => state.notes.notes) || [];

  const handleChange = ({ target: { name, value } }: any) =>
    setNote({ ...note, [name]: value });

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    console.log('submit', event);

  };

  const isFormValid = note.title && note.content;

  return (
    <section className="flex flex-col w-full h-full p-8">
      <div className='flex flex-row justify-between'>
        <h1 className="text-3xl mb-8">{t('title')}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>{t('add-note')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='mb-4'>{t('note-label')}</DialogTitle>
              <DialogDescription>
                <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                  <Input
                    type='text'
                    name='title'
                    placeholder={t('note-title')}
                    onChange={handleChange}
                  />
                  <Input
                    type='text'
                    name='content'
                    placeholder={t('note-content')}
                    onChange={handleChange}
                  />
                  <Button disabled={!isFormValid}>
                    {isLoading && (
                      <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    {t('save-note')}
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <article className="flex flex-row gap-4">
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
