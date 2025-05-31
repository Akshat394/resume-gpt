import { NextRequest, NextResponse } from 'next/server';
import PDFParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const data = await PDFParse(buffer, {
      max: 0, // No page limit
      version: 'v2.0.550',
      pagerender: (pageData: any) => {
        return pageData.getTextContent();
      }
    });
    
    return NextResponse.json({ text: data.text });
  } catch (err) {
    console.error('PDF parse error:', err);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}