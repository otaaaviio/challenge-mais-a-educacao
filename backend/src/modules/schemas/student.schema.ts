import { z } from 'zod';

export const createStudentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  ra: z.string().min(1, 'RA is required'),
  cpf: z.string().refine((cpf: string) => {
    if (typeof cpf !== "string") return false;

    const cleanCpf = cpf.replace(/[^\d]+/g, "");

    if (cleanCpf.length !== 11 || !!cleanCpf.match(/(\d)\1{10}/)) return false;

    const cpfDigits = cleanCpf.split("").map((el) => +el);
    const rest = (count: number): number => {
      return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
    };
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }, "Invalid CPF"),
});

export const updateStudentSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
});