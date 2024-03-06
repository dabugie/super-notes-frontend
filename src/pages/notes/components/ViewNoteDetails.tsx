import { DialogHeader } from '@/components';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Note } from '@/models/note.model';
import type { RootState } from '@/store/store';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

export const ViewNoteDetail = ({ open, setLoading }: { open: boolean; setLoading: any }) => {
  const selectedNote = useSelector<RootState, Note | null>((state: RootState) => state.selectedNote.note);

  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    if (open) setLoading(true);

    if (selectedNote && open) {
      setTimeout(() => {
        setLoading(false);
        setOpenView(true);
      }, 250);
    }
  }, [open, selectedNote, setLoading]);

  return (
    <Dialog open={openView} onOpenChange={setOpenView}>
      <DialogContent className="w-96 md:w-full">
        <DialogHeader>
          <DialogTitle className="mb-4">{selectedNote?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <p>{selectedNote?.content}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
