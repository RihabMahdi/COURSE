// src/components/CourseForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../slices/courseSlice';
import { useNavigate } from 'react-router-dom';

const CourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      id: Date.now(), // Generate a unique ID
      title,
      details,
      image,
    };

    dispatch(addCourse(newCourse));
    navigate('/'); // Redirect to course list after adding
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Add Course</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
