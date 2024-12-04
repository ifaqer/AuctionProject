'use client';

import { Comment } from '@prisma/client';
import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios';
import React from 'react';
interface Props {
  id: string;
}
type CommentWithAuthor = Comment & {
  author: {
    name: string;
    image: string;
  };
};

const Comments: React.FC<Props> = ({ id }) => {
  const { isAuth, user } = useAuthStore();
  const [newComment, setNewComment] = React.useState('');
  const [comments, setComments] = React.useState<CommentWithAuthor[]>([]);

  const addComment = async () => {
    try {
      await axios.post('/api/listings/comments', {
        text: newComment,
        authorId: user?.id,
        listingId: Number(id),
      });
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error('Ошибка при создании комментария:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/listings/comments');
      const commentsList = data.filter((comment: Comment) => comment.listingId === Number(id));
      setComments(commentsList);
    } catch (error) {
      console.error('Ошибка при получении комментариев:', error);
    }
  };

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  React.useEffect(() => {
    fetchComments();
  }, []);
  // console.log('ID: ', user.id);
  return (
    <div className="space-y-4 mb-12">
      {isAuth && (
        <div className="flex items-center space-x-2 w-3/5 m-auto">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 w-3/5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Напишите комментарий..."
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-3xl"
            onClick={addComment}>
            📝 Комментировать
          </button>
        </div>
      )}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-3/5 items-center m-auto">
          <p className="text-gray-800 font-medium">{comment.text}</p>
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-gray-600">Пользователь {comment.author.name}</p>
            <span className="text-gray-400">·</span>
            <p className="text-gray-600">Создано {formatDate(comment.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
