import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  
  if (!file || file.type.split('/')[0] !== 'image') {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  
  const ext = file.name.split('.').pop(); 
  const filename = `img-${nanoid()}.${ext}`;

  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
  await writeFile(filePath, buffer);

  return NextResponse.json({ url: filename }); 
}
