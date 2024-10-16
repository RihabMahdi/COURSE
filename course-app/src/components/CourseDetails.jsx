
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Course Details</h1>
      <p className="text-lg">Details for course with ID: {id}</p>
    </div>
  );
};

export default CourseDetails;
