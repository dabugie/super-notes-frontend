import { DialogHeader } from '@/components';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Note } from '@/models/note.model';
import type { RootState } from '@/store/store';

import { useSelector } from 'react-redux';

export const ViewNoteDetail = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const selectedNote = useSelector<RootState, Note | null>((state: RootState) => state.selectedNote.note);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
