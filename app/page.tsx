'use client';

import Category from '@/components/Category';
import ListItems from '@/components/ListItems';
import Menu from '@/components/Menu';
import React from 'react';

export default function Home() {
  const [onCategory, setOnCategory] = React.useState(false);
  const [valueCategory, setValueCategory] = React.useState('');
  return (
    <div className="container bg-gray-50 rounded-xl my-4 mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
      <span className="text-gray-600 text-base font-semibold">by Матвиенко Александр</span>
      <h1 className="text-4xl font-bold mb-2 text-gray-900">
        {!onCategory
          ? `💰 Аукцион | ${valueCategory ? valueCategory : 'Список активных'}`
          : '❗️Выберите категорию'}
      </h1>
      <p className="text-gray-700">
        Аукцио́н — публичная продажа товаров по заранее установленным правилам
      </p>

      <div className="border-b-8 bg-slate-600"></div>
      <Menu setCategory={setOnCategory} setValueCategory={setValueCategory} />
      <div className="w-full h-0.5 bg-gray-200 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!onCategory ? (
          <ListItems category={valueCategory} className="" />
        ) : (
          <Category setValueCategory={setValueCategory} setOnCategory={setOnCategory} />
        )}
      </div>
    </div>
  );
}
