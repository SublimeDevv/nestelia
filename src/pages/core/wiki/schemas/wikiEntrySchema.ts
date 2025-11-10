import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createWikiEntrySchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(5000, "La descripción no puede exceder 5000 caracteres"),
  categoryId: z
    .string()
    .min(1, "Debes seleccionar una categoría"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Debes seleccionar una imagen")
    .refine(
      (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
      "La imagen no debe superar 10MB"
    )
    .refine(
      (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan archivos .jpg, .jpeg, .png y .webp"
    ),
});

export const updateWikiEntrySchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(5000, "La descripción no puede exceder 5000 caracteres"),
  categoryId: z
    .string()
    .min(1, "Debes seleccionar una categoría"),
  image: z
    .any()
    .refine(
      (file) => !file || file instanceof File,
      "Debe ser un archivo válido"
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "La imagen no debe superar 10MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan archivos .jpg, .jpeg, .png y .webp"
    )
    .optional(),
});

export type CreateWikiEntryFormData = z.infer<typeof createWikiEntrySchema>;
export type UpdateWikiEntryFormData = z.infer<typeof updateWikiEntrySchema>;

