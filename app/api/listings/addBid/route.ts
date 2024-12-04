import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, bidderId, listingId } = await request.json();

    const bid = await prisma.bid.create({
      data: {
        amount,
        bidderId,
        listingId,
      },
    });

    return NextResponse.json(bid, { status: 200 });
  } catch (error: unknown) {
    console.error('Ошибка при создании ставки:', error);
    return NextResponse.json({ error: 'Ошибка при создании ставки' }, { status: 500 });
  }
}
