import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 *  Utilitário para concatenar classes CSS de forma condicional (clsx)
 *  e resolver conflitos do Tailwind (twMerge).
 **/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
