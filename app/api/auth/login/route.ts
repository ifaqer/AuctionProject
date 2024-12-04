import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // проверка паролей (True или False)

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
    }

    return NextResponse.json({ name: user.name, email: user.email, id: user.id }, { status: 200 });
  } catch (error: unknown) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка при входе' }, { status: 500 });
  }
}
