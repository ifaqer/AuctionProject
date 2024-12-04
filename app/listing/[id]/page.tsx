/* eslint-disable @next/next/no-img-element */
'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Comments from '@/components/Comments';
import { User } from '@prisma/client';

interface Props {
  params: {
    id: string;
  };
}

interface Bid {
  id: string;
  bidder: User;
  userId: string;
  listingId: string;
  amount: number;
  createdAt: string;
}

interface ListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  startingBid: number;
  imageUrl: string;
  createdAt: string;
  bids: Bid[];
  createdBy: {
    id: string;
    name: string;
  };
  isActive: boolean;
}

export const Listing: React.FC<Props> = ({ params }) => {
  const router = useRouter();
  const [listItem, setListItem] = useState<ListItem>();
  const [error, setError] = useState(false);
  const [bid, setBid] = useState<number>(0);
  const { id } = params;
  const { isAuth, user } = useAuthStore();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const getListing = async () => {
    const { data } = await axios.get('/api/listings');
    const item = await data.listings.find((obj: ListItem) => String(obj.id) === String(id));
    setListItem(item);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Проверка на валидность ставки
    if (
      !bid ||
      bid <= Math.max(...listItem!.bids.map((bid) => bid.amount)) ||
      bid < listItem!.startingBid
    ) {
      setError(true);
      e.preventDefault();
      return;
    }
    try {
      await axios.post('/api/listings/addBid', {
        amount: bid,
        bidderId: user?.id,
        listingId: Number(id),
      });
      router.refresh();
    } catch (error) {
      console.error('Ошибка ставки:', error);
    }
  };

  const finishListing = async () => {
    try {
      await axios.post(`/api/listings/finished`, { id: id });
      setListItem((prevListItem) =>
        prevListItem ? { ...prevListItem, isActive: false } : prevListItem,
      );
    } catch (error) {
      console.error('Ошибка завершения листинга:', error);
    }
  };

  React.useEffect(() => {
    getListing();
  }, []);

  const leader = listItem?.bids.find(
    (bid) => bid.amount == Math.max(...listItem.bids.map((bid) => bid.amount)),
  )?.bidder?.name;

  return (
    <>
      {listItem && (
        <div>
          <form onSubmit={handleSubmit} className="container mx-auto py-3">
            <div className="bg-white shadow-md rounded-lg overflow-hidden min-h-96 mt-12">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={
                      listItem?.imageUrl || 'https://i.ytimg.com/vi/6--ubp_uxLA/maxresdefault.jpg'
                    }
                    alt={listItem?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <h1 className="text-2xl font-bold mb-0.5">{listItem.title}</h1>
                  <p className="text-gray-600 mb-6">Категория: {listItem.category}</p>
                  <p className="text-gray-700 mb-4">{`Описание: ${listItem.description}`}</p>
                  {listItem.bids.length > 0 ? (
                    <p className="text-green-800 font-bold mb-0 text-xl">
                      Ставка: 💵 {Math.max(...listItem.bids.map((bid) => bid.amount))} | {leader}
                    </p>
                  ) : (
                    <p className="text-red-800 font-bold mb-0 text-xl">
                      Начальная ставка: 💵 {listItem.startingBid}
                    </p>
                  )}
                  <p className="text-gray-600 pt-0">
                    сделано всего <b>{listItem.bids.length}</b> ставок | создатель{' '}
                    {listItem.createdBy.name}
                  </p>
                  {listItem.isActive ? (
                    <>
                      {user?.name === listItem.createdBy.name ? (
                        <button
                          type="button"
                          onClick={finishListing}
                          className="hover:bg-slate-50 text-red-600 border-red-800 px-2 py-2 rounded-md mx-auto border-2 mt-1 font-semibold">
                          Завершить
                        </button>
                      ) : (
                        <div>
                          <input
                            type="text"
                            placeholder="Введите ставку"
                            className="border rounded-md p-2 w-full mb-2 mt-2"
                            onChange={(e) => setBid(Number(e.target.value))}
                          />
                          {error && (
                            <p className="text-black-400 font-medium mb-0 text-base">
                              ❌ Ставка слишком мала
                            </p>
                          )}
                          <button
                            type={!isAuth ? 'button' : 'submit'}
                            className={cn(
                              'hover:bg-slate-50 text-black border-gray-800 px-2 py-2 rounded-md mx-auto border-2 mt-1 font-semibold',
                              !isAuth ? 'cursor-not-allowed opacity-50' : '',
                            )}>
                            Сделать ставку
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-red-700 font-bold mb-0 text-xl">❤️ Победитель: {leader}</p>
                  )}
                  <p className="text-gray-600 mt-8">Создано: {formatDate(listItem.createdAt)}</p>
                </div>
              </div>
            </div>
          </form>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md mx-auto block mt-1 mb-4 font-semibold text-center">
            Главное меню
          </button>
          <Comments id={id} />
        </div>
      )}
    </>
  );
};

export default Listing;
