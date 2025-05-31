declare module 'pdfjs-dist/legacy/build/pdf' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<TextContent>;
  }

  export interface TextContent {
    items: Array<{
      str: string;
      transform: number[];
    }>;
  }

  export interface GlobalWorkerOptions {
    workerSrc: string;
  }

  export interface GetDocumentOptions {
    data: ArrayBuffer;
    disableFontFace?: boolean;
    standardFontDataUrl?: string;
  }

  export const GlobalWorkerOptions: GlobalWorkerOptions;
  export function getDocument(options: GetDocumentOptions): { promise: Promise<PDFDocumentProxy> };
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const worker: string;
  export default worker;
} 