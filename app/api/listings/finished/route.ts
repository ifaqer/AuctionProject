import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const listing = await prisma.listing.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(listing, { status: 200 });
  } catch (error: unknown) {
    console.error('Ошибка при завершении листинга:', error);
    return NextResponse.json({ error: 'Ошибка при завершении листинга' }, { status: 500 });
  }
}
