import z from "zod";
export const loginSchema = z.object({
  email: z
    .email({ message: "Correo electrónico inválido" })
    .min(1, { message: "El correo electrónico es requerido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
