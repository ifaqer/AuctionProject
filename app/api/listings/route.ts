import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const listings = await prisma.listing.findMany({
    select: {
      id: true,
      title: true,
      isActive: true,
      description: true,
      startingBid: true,
      imageUrl: true,
      category: true,
      createdAt: true,
      bids: {
        select: {
          amount: true,
          id: true,
          bidder: {
            select: {
              name: true,
            },
          },
        },
      },
      comments: {
        select: {
          author: true,
          text: true,
        },
      },
      endTime: true,
      createdBy: true,
    },
  });
  return NextResponse.json({
    listings,
  });
}

// 404 - Not Found
// Используется когда пользователь не найден в базе данных

// 401 - Unauthorized
// Возвращается при неверном пароле

// 500 - Internal Server Error
// Возвращается при внутренних ошибках сервера

// 200 - OK
// Успешное выполнение запроса
// Можно добавить в ваш код при успешном входе

// 201 - Created
// Успешное создание ресурса
// Полезен при регистрации новых пользователей

// 400 - Bad Request
// Неверный формат запроса
// Можно использовать при валидации данных

// 403 - Forbidden
// Доступ запрещен
// Useful для защищенных эндпоинтов

// 429 - Too Many Requests
// Превышен лимит запросов
// Полезен при реализации rate limiting
