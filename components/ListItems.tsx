/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  imageUrl: string;
  startingBid: number;
  category: string;
  isActive: boolean;
}

interface ItemProps {
  className?: string;
  category: string;
}

const ListItems: React.FC<ItemProps> = ({ className, category }) => {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const getListings = async () => {
    try {
      const { data } = await axios.get('/api/listings');
      setListings(
        category
          ? data.listings.filter((item: { category: string }) => item.category === category)
          : data.listings,
      );
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    getListings();
  }, [category]);
  return (
    <>
      {listings.map((listing) => (
        <div
          onClick={() => router.push(`/listing/${listing.id}`)}
          key={listing.id}
          className={`${className} bg-white shadow-md rounded-lg overflow-hidden cursor-pointer`}>
          <h1 className="text-xl font-normal text-center mb-0">{listing.title}</h1>
          <p className="text-gray-600 text-center">Категория: {listing.category || 'не выбрана'}</p>
          <img
            className="max-h-52 w-full object-cover px-2 rounded-3xl"
            src={listing.imageUrl || 'https://i.ytimg.com/vi/6--ubp_uxLA/maxresdefault.jpg'}
            alt={listing.title}
          />
          <div className="p-4">
            {listing.isActive ? (
              <p className="text-green-800 font-bold mb-2">
                Начальная ставка: 💵 ${listing.startingBid}
              </p>
            ) : (
              <p className="text-red-800 font-bold mb-2">🚫 Закрыт</p>
            )}
            <p className="text-gray-600">Создано: {formatDate(listing.createdAt)}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListItems;
