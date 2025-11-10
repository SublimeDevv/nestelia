import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; 
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-Z0-9_-]+$/, "El nombre solo puede contener letras, números, guiones y guiones bajos"),
  displayName: z
    .string()
    .min(2, "El nombre a mostrar debe tener al menos 2 caracteres")
    .max(100, "El nombre a mostrar no puede exceder 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  icon: z
    .instanceof(File, { message: "Debes seleccionar un ícono" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "El ícono no debe exceder 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan imágenes en formato JPG, JPEG o PNG"
    ),
});

export const editCategorySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-Z0-9_-]+$/, "El nombre solo puede contener letras, números, guiones y guiones bajos"),
  displayName: z
    .string()
    .min(2, "El nombre a mostrar debe tener al menos 2 caracteres")
    .max(100, "El nombre a mostrar no puede exceder 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  icon: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "El ícono no debe exceder 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Solo se aceptan imágenes en formato JPG, JPEG, PNG, WEBP o SVG"
    )
    .optional(),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type EditCategoryFormData = z.infer<typeof editCategorySchema>;

