import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClasses } from '../../redux/classSlice';
import { enrollClass } from '../../redux/userSlice';
import axios from 'axios';

const AllClasses = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get('http://localhost:5000/api/classes/getAll');
      dispatch(setClasses(response.data));
    };
    fetchClasses();
  }, [dispatch]);

  const handleEnroll = async (classId) => {
    if (user) {
      try {
        console.log('Enrolling user:', user.id);
        await axios.post(`http://localhost:5000/api/classes/${classId}/enroll`, { studentId: user.id });
        dispatch(enrollClass(classId));
        alert('Enrolled successfully!');
      } catch (error) {
        console.error('Error enrolling in class:', error);
        alert('Failed to enroll. Please try again.');
      }
    } else {
      alert('Please log in to enroll in a class.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls._id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{cls.title}</h2>
            <p className="mb-2">{cls.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEnroll(cls._id)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
