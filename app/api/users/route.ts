import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      createdAt: true,
      watchlist: true,
      Bid: true,
      Comment: true,
    },
  });
  return NextResponse.json({
    ...users,
  });
}
