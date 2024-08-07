import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ClassFiles = () => {
  const { classId } = useParams();
  const [files, setFiles] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await axios.get(`http://localhost:5000/api/files/class/${classId}`);
      setFiles(response.data);
    };
    fetchFiles();
  }, [classId]);

  const handleDownload = (fileId) => {
    window.open(`http://localhost:5000/api/files/download/${fileId}`);
  };

  const handleWithdraw = async () => {
    if (user) {
      try {
        const response = await axios.post('http://localhost:5000/api/withdrawal-requests/create', {
          userId: user.id,
          classId,
        });
        alert('Withdrawal request submitted');
      } catch (error) {
        console.error('Error submitting withdrawal request', error);
        alert('Failed to submit withdrawal request. Please try again.');
      }
    } else {
      alert('Please log in to withdraw from a class.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class Files</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {files.map((file) => (
          <div key={file._id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{file.fileName}</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleDownload(file._id)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-6"
        onClick={handleWithdraw}
      >
        Withdraw from Class
      </button>
    </div>
  );
};

export default ClassFiles;
