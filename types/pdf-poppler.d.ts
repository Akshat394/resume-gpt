declare module 'pdf-poppler' {
  interface ConvertOptions {
    out_dir?: string;
    out_prefix?: string;
    page?: number;
    format?: string;
    dpi?: number;
  }

  export function convert(input: string, options: ConvertOptions): Promise<void>;
} 