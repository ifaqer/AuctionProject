'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const CreateListing: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startingBid, setStartingBid] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(user);
      console.log({
        title,
        description,
        category,
        startingBid,
        imageUrl,
        createdById: user?.id,
      });
      await axios.post('/api/listings/create', {
        title,
        description,
        category,
        startingBid,
        imageUrl,
        createdById: user?.id,
      });
      router.push('/');
    } catch (error) {
      console.error('Ошибка создания объявления:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Создать новое объявление</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Описание
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-2">
            Категория
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startingBid" className="block font-medium mb-2">
            Начальная ставка
          </label>
          <input
            type="number"
            id="startingBid"
            value={startingBid}
            onChange={(e) => setStartingBid(Number(e.target.value))}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-medium mb-2">
            URL-адрес изображения
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Создать объявление
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
