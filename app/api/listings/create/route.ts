import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function POST(request: Request) {
  const { title, description, category, startingBid, imageUrl, createdById } = await request.json();

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        category,
        startingBid,
        imageUrl,
        createdById,
        isActive: true,
      },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error('Ошибка создания объявления:', error);
    return NextResponse.json({ error: 'Не удалось создать объявление' }, { status: 500 });
  }
}
