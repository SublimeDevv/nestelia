import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; 
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png"
];

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  content: z
    .string()
    .min(5, "El contenido debe tener al menos 50 caracteres"),
  image: z
    .instanceof(File, { message: "Debes seleccionar una imagen" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "La imagen no debe exceder 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan imágenes en formato JPG, JPEG o PNG"
    ),
});

export const editNewsSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  content: z
    .string()
    .min(5, "El contenido debe tener al menos 50 caracteres"),
  image: z
    .instanceof(File, { message: "Debes seleccionar una imagen" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "La imagen no debe exceder 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan imágenes en formato JPG, JPEG, PNG o WEBP"
    )
    .optional(),
});

export type CreateNewsFormData = z.infer<typeof createNewsSchema>;
export type EditNewsFormData = z.infer<typeof editNewsSchema>;

