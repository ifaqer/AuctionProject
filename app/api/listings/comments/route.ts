import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    return NextResponse.json({ error: 'Ошибка при получении комментариев' }, { status: 500 });
  }
}
export async function POST(request: Request) {
  const { text, authorId, listingId } = await request.json();
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        authorId,
        listingId,
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании комментария:', error);
    return NextResponse.json({ error: 'Ошибка при создании комментария' }, { status: 500 });
  }
}
