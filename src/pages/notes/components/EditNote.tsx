import { noteSchema } from '@/models/validators/createNote';
import type { RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { z } from 'zod';

import { Button, Icons, Input, Textarea } from '@/components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { Note } from '@/models/note.model';
import { useEffect } from 'react';
import { useState, type SyntheticEvent } from 'react';
import { updateNote } from '@/services/notesServices';

export const EditNote = ({ open }: { open: boolean }) => {
  const selectedNote = useSelector<RootState, Note | null>((state: RootState) => state.selectedNote.note);
  const isLoading = useSelector((state: RootState) => state.notes.isLoading);

  const [openEdit, setOpenEdit] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof noteSchema>>({
    mode: 'onChange',
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: selectedNote?.title || '',
      content: selectedNote?.content || ''
    }
  });

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const note = form.getValues();
    updateNote(dispatch, selectedNote!.id, note).then(() => {
      form.reset();
      setOpenEdit(false);
    });
  };

  const isFormValid = form.formState.isValid;

  useEffect(() => {
    if (selectedNote && open) {
      form.reset({
        title: selectedNote.title,
        content: selectedNote.content
      });
      setOpenEdit(true);
    }
  }, [form, open, selectedNote]);

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent className="w-96 md:w-full">
        <DialogHeader>
          <DialogTitle className="mb-4">{t('note-edit-view')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('note-title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('note-content')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[250px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isFormValid || isLoading} type="submit">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {t('save-note')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
