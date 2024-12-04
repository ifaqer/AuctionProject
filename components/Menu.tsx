'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuthStore, hydrateAuthStore } from '@/store/useAuthStore';

interface Props {
  setCategory: (value: boolean) => void;
  setValueCategory: (value: string) => void;
  className?: string;
}

const Menu: React.FC<Props> = ({ setCategory, setValueCategory, className }) => {
  const { isAuth, logout, user } = useAuthStore();
  React.useEffect(() => {
    hydrateAuthStore();
  }, []);
  return (
    <ul className="flex space-x-8 mb-2">
      <li
        onClick={() => {
          setCategory(false);
          setValueCategory('');
        }}
        className="text-lg text-blue-600 hover:text-blue-800 cursor-pointer">
        Все
      </li>
      <li
        className="text-lg text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => setCategory(true)}>
        Категории
      </li>
      <li
        className={cn(
          'text-lg text-gray-600 hover:text-gray-800 cursor-pointer',
          !isAuth ? 'hidden' : '',
        )}>
        Избранные
      </li>
      <li
        className={cn(
          'text-lg text-gray-600 hover:text-gray-800 cursor-pointer',
          !isAuth ? 'hidden' : '',
        )}>
        <Link href="/createList">Создать</Link>
      </li>
      <li
        className={cn(
          isAuth
            ? 'text-lg text-red-600 hover:text-red-800 cursor-pointer'
            : 'text-lg text-green-600 hover:text-green-800 cursor-pointer',
        )}>
        {isAuth ? (
          <Link href="/" onClick={logout}>
            Выйти ({user?.name})
          </Link>
        ) : (
          <Link href="/login">Войти</Link>
        )}
      </li>
    </ul>
  );
};

export default Menu;
