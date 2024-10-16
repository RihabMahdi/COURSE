
import { useSelector } from 'react-redux';
import CourseForm from './CourseForm';
import { useParams } from 'react-router-dom';

const EditCourse = () => {
  const { id } = useParams(); // Récupérer l'ID du cours à partir de l'URL
  const course = useSelector((state) => state.courses.courses.find((c) => c.id === parseInt(id)));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <CourseForm course={course} /> {/* Passer le cours à mettre à jour au formulaire */}
    </div>
  );
};

export default EditCourse;
