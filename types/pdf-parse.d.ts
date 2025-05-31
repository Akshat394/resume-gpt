declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    info: {
      PDFFormatVersion: string;
      IsAcroFormPresent: boolean;
      IsXFAPresent: boolean;
      [key: string]: any;
    };
    metadata: any;
    version: string;
  }

  interface PDFParseOptions {
    pagerender?: (pageData: any) => Promise<string>;
    max?: number;
    version?: string;
  }

  function PDFParse(dataBuffer: Buffer, options?: PDFParseOptions): Promise<PDFData>;
  export = PDFParse;
} 