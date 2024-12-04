import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создаем пользователей
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password1',
      name: 'User 1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password2',
      name: 'User 2',
    },
  });

  // Создаем объявления
  const listing1 = await prisma.listing.create({
    data: {
      title: 'Vintage Camera',
      description: 'A well-preserved vintage camera from the 1970s',
      startingBid: 50,
      imageUrl: 'https://example.com/vintage-camera.jpg',
      category: 'Electronics',
      createdById: user1.id,
      isActive: true,
      endTime: new Date('2023-06-30T23:59:59Z'),
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: 'Antique Vase',
      description: 'A beautiful antique vase from the 19th century',
      startingBid: 100,
      imageUrl: 'https://example.com/antique-vase.jpg',
      category: 'Home & Garden',
      createdById: user2.id,
      isActive: true,
      endTime: new Date('2023-07-31T23:59:59Z'),
    },
  });

  // Создаем ставки
  await prisma.bid.create({
    data: {
      amount: 75,
      bidderId: user1.id,
      listingId: listing2.id,
    },
  });

  await prisma.bid.create({
    data: {
      amount: 125,
      bidderId: user2.id,
      listingId: listing1.id,
    },
  });

  // Создаем комментарии
  await prisma.comment.create({
    data: {
      text: 'Отличное объявление!',
      authorId: user1.id,
      listingId: listing2.id,
    },
  });

  await prisma.comment.create({
    data: {
      text: 'Интересный лот, стоит посмотреть',
      authorId: user2.id,
      listingId: listing1.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
