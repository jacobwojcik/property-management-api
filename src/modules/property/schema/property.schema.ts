import { z } from 'zod';
import { State } from '@prisma/client';

export const createPropertySchema = z.object({
  city: z.string().min(1),
  street: z.string().min(1),
  state: z.nativeEnum(State),
  zipCode: z.string().length(5),
});

export const propertyFilterSchema = z.object({
  city: z.string().optional(),
  state: z.nativeEnum(State).optional(),
  zipCode: z.string().length(5).optional(),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type PropertyFilter = z.infer<typeof propertyFilterSchema>;
