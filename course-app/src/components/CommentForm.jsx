import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../slices/courseSlice';

const CommentForm = ({ courseId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ courseId, comment }));
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        className="w-full p-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
      >
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
