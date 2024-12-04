import axios from 'axios';
import React from 'react';

interface Props {
  setValueCategory: (value: string) => void;
  setOnCategory: (value: boolean) => void;
  className?: string;
}

const Category: React.FC<Props> = ({ className, setValueCategory, setOnCategory }) => {
  const [allCategory, setAllCategory] = React.useState<string[]>([]);
  const getCategories = async () => {
    try {
      const { data } = await axios.get('/api/listings');
      const allCategories = new Set<string>();

      data.listings.forEach((item: { category: string }) => {
        allCategories.add(item.category);
      });

      setAllCategory(Array.from(allCategories));
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div
        key={'default'}
        onClick={() => {
          setValueCategory('');
          setOnCategory(false);
        }}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-center mr-2 mb-2 cursor-pointer hover:bg-gray-300">
        не выбрано
      </div>
      {allCategory.map(
        (categ) =>
          categ && (
            <div
              key={categ}
              onClick={() => {
                setValueCategory(categ);
                setOnCategory(false);
              }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-center mr-2 mb-2 cursor-pointer hover:bg-gray-300">
              {categ}
            </div>
          ),
      )}
    </>
  );
};

export default Category;
