import { Button, Icons, Input, Textarea } from '@/components';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { noteSchema } from '@/models/validators/createNote';
import { createNote } from '@/services/notesServices';
import type { RootState } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type * as z from 'zod';

export const CreateNote = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const isLoading = useSelector((state: RootState) => state.notes.isLoading);

  const form = useForm<z.infer<typeof noteSchema>>({
    mode: 'onChange',
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const note = form.getValues();
    createNote(dispatch, note).then(() => {
      form.reset();
      setOpen(false);
    });
  };

  const isFormValid = form.formState.isValid;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t('add-note')}</Button>
      </DialogTrigger>
      <DialogContent className="w-96 md:w-full">
        <DialogHeader>
          <DialogTitle className="mb-4">{t('note-label')}</DialogTitle>
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
                    <Textarea {...field} className="min-h-[150px]" />
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
