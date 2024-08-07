import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setEnrolledClasses, setUser } from '../../redux/userSlice';
import {jwtDecode} from 'jwt-decode';

const MyClasses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const enrolledClasses = useSelector((state) => state.user.filteredEnrolledClasses);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      if (user) {
        console.log('Fetching classes for user:', user.id);
        const response = await axios.get(`http://localhost:5000/api/classes/student/${user.id}/classes`);
        console.log('Classes fetched:', response.data);
        dispatch(setEnrolledClasses(response.data));
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        dispatch(setUser({ id: decoded.userId, username: decoded.username }));
        await fetchClasses();
      } else {
        navigate('/login');
      }
    };

    if (!user) {
      fetchUser();
    } else {
      fetchClasses();
    }
  }, [dispatch, user, navigate]);

  console.log('Enrolled Classes:', enrolledClasses);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {enrolledClasses.map((cls) => (
          <div key={cls._id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{cls.title}</h2>
            <p className="mb-2">{cls.description}</p>
            <Link to={`/class-files/${cls._id}`} className="bg-green-500 text-white px-4 py-2 rounded">
              View Files
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
