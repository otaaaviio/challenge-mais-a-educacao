import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
  name: z.string().min(3, 'Name must have at least 3 characters'),
});

type LoginRequest = z.infer<typeof loginSchema>;
type RegisterRequest = z.infer<typeof registerSchema>;

export { LoginRequest, RegisterRequest };
