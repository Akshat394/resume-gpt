import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString?: string, 
  formatType: 'full' | 'month-year' | 'year' = 'month-year'
): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    switch (formatType) {
      case 'full':
        return format(date, 'MMMM d, yyyy');
      case 'month-year':
        return format(date, 'MMM yyyy');
      case 'year':
        return format(date, 'yyyy');
      default:
        return format(date, 'MMM yyyy');
    }
  } catch (error) {
    return dateString;
  }
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}