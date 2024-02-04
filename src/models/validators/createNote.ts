import * as z from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1, { message: 'Title must be at least 1 character long' }).max(100),
  content: z.string().min(1, { message: 'Content must be at least 1 character long' }).max(1000)
});
