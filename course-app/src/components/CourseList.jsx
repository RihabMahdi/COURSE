import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, deleteCourse, updateCourse } from '../slices/courseSlice';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const status = useSelector((state) => state.courses.status);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDetails, setEditedDetails] = useState('');
  const [editedImage, setEditedImage] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch(deleteCourse(id));
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  const handleEditing = (course) => {
    setSelectedCourse(course);
    setEditedTitle(course.title);
    setEditedDetails(course.details);
    setEditedImage(course.image);
    setIsEditing(true);
  };

  const handleUpdateCourse = () => {
    const updatedCourse = {
      ...selectedCourse,
      title: editedTitle,
      details: editedDetails,
      image: editedImage,
    };
    dispatch(updateCourse(updatedCourse));
    setIsEditing(false);
    setSelectedCourse(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-4xl font-bold text-center mb-8">Course List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gradient-to-r from-blue-400 to-indigo-600 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold text-center p-4 text-white">{course.title}</h2>
            <div className="flex justify-center px-5">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover rounded-lg border-2 border-white shadow-md"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <button
                onClick={() => handleViewDetails(course)}
                className="text-white hover:text-gray-200 flex items-center"
              >
                <FaEye className="h-5 w-5 mr-1" />
                View
              </button>
              <div className="flex">
                <button
                  onClick={() => handleEditing(course)}
                  className="text-yellow-300 hover:text-yellow-400 flex items-center mr-4"
                >
                  <FaEdit className="h-5 w-5 mr-1" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrash className="h-5 w-5 mr-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
          editedImage={editedImage}
          handleImageChange={handleImageChange}
          handleUpdateCourse={handleUpdateCourse}
        />
      )}
    </div>
  );
};

const CourseDetails = ({
  course,
  setSelectedCourse,
  isEditing,
  setIsEditing,
  editedTitle,
  setEditedTitle,
  editedDetails,
  setEditedDetails,
  editedImage,
  handleImageChange,
  handleUpdateCourse,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-3 rounded shadow-lg max-w-md mx-auto">
        {isEditing ? (
          <div>
            <h2 className="text-2xl font-bold">Editing: {course.title}</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Course Title"
            />
            <textarea
              value={editedDetails}
              onChange={(e) => setEditedDetails(e.target.value)}
              rows="4"
              className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Course Details"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4"
            />
            {editedImage && (
              <img src={editedImage} alt="Preview" className="mt-2 rounded-md" />
            )}
            <button
              onClick={handleUpdateCourse}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <h3 className="mt-4 font-semibold">Details:</h3>
            <p>{course.details}</p>
          </div>
        )}
        <button
          onClick={() => setSelectedCourse(null)}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CourseList;
