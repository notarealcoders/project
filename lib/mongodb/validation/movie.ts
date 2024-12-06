import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1).max(60),
  year: z.number().min(1888).max(new Date().getFullYear() + 5),
  plot: z.string().min(1),
  rated: z.string().optional(),
  released: z.string().datetime().optional(),
  runtime: z.string().optional(),
  directors: z.array(z.string()).optional(),
  cast: z.array(z.string()).optional(),
  type: z.string().optional()
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;