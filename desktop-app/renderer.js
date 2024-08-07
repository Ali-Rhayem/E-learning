document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();
  
    switch(page) {
      case 'index.html':
        break;
      case 'add-class.html':
        handleAddClassPage();
        break;
      case 'list-students.html':
        handleListStudentsPage();
        break;
      case 'upload-file.html':
        handleUploadFilePage();
        break;
      case 'manage-requests.html':
        handleManageRequestsPage();
        break;
      default:
        console.error(`No handler for ${page}`);
    }
  });
  
  function handleAddClassPage() {
    const addClassForm = document.getElementById('add-class-form');
    addClassForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = document.getElementById('class-title').value;
      const description = document.getElementById('class-description').value;
      const response = await fetch('http://localhost:5000/api/classes/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
          alert('Class added successfully');
          fetchClasses();
      } else {
          alert('Failed to add class');
      }
    });
  }
  
  function handleListStudentsPage() {
    const classSelect = document.getElementById('class-select');
    const studentsList = document.getElementById('students-list');
  
    classSelect.addEventListener('change', async () => {
      const classId = classSelect.value;
      try {
          const response = await fetch(`http://localhost:5000/api/classes/${classId}/students`);
          if (!response.ok) {
              throw new Error('Failed to fetch students');
          }
          const students = await response.json();
          studentsList.innerHTML = '';
          students.forEach(student => {
              const li = document.createElement('li');
              li.textContent = student.username;
              studentsList.appendChild(li);
          });
      } catch (error) {
          console.error('Error fetching students:', error);
      }
    });
  
    fetchClasses();
  }
  
  function handleUploadFilePage() {
    const uploadFileForm = document.getElementById('upload-file-form');
    const uploadClassSelect = document.getElementById('upload-class-select');
  
    uploadFileForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const fileInput = document.getElementById('file-input');
      const classId = uploadClassSelect.value;
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('classId', classId);
  
      try {
          const response = await fetch('http://localhost:5000/api/files/upload', {
              method: 'POST',
              body: formData,
          });
          if (response.ok) {
              alert('File uploaded successfully');
          } else {
              const errorData = await response.json();
              console.error('Failed to upload file:', errorData);
              alert('Failed to upload file');
          }
      } catch (error) {
          console.error('Failed to upload file:', error);
          alert('Failed to upload file');
      }
    });
  
    fetchClasses();
  }
  
  function handleManageRequestsPage() {
    const withdrawalRequestsList = document.getElementById('withdrawal-requests-list');

    async function fetchWithdrawalRequests() {
      try {
          const response = await fetch('http://localhost:5000/api/withdrawal-requests/getAll');
          const requests = await response.json();
          withdrawalRequestsList.innerHTML = '';
          requests.forEach(request => {
              if (request.userId && request.classId) {
                  const li = document.createElement('li');
                  li.textContent = `Student: ${request.userId.username}, Class: ${request.classId.title}, Status: ${request.status}`;
                  const approveButton = document.createElement('button');
                  approveButton.textContent = 'Approve';
                  approveButton.className = 'text-accent hover:text-success m-2 px-1 py-0.5 text-s'; 
                  approveButton.onclick = async () => {
                      await updateRequestStatus(request._id, 'approved');
                      fetchWithdrawalRequests();
                  };
                  const rejectButton = document.createElement('button');
                  rejectButton.textContent = 'Reject';
                  rejectButton.className = 'text-error hover:text-red-700 text-s';
                  rejectButton.onclick = async () => {
                      await updateRequestStatus(request._id, 'rejected');
                      fetchWithdrawalRequests();
                  };
                  li.appendChild(approveButton);
                  li.appendChild(rejectButton);
                  withdrawalRequestsList.appendChild(li);
              } else {
                  console.warn('Missing userId or classId in request:', request);
              }
          });
      } catch (error) {
          console.error('Failed to fetch withdrawal requests:', error);
      }
  }
  

    async function updateRequestStatus(requestId, status) {
        await fetch(`http://localhost:5000/api/withdrawal-requests/${requestId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
    }

    fetchWithdrawalRequests();
}
  
  async function fetchClasses() {
    const classSelect = document.getElementById('class-select');
    const uploadClassSelect = document.getElementById('upload-class-select');
  
    if (classSelect) classSelect.innerHTML = '';
    if (uploadClassSelect) uploadClassSelect.innerHTML = '';
  
    try {
        const response = await fetch('http://localhost:5000/api/classes/getAll');
        const classes = await response.json();
        
        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls._id;
            option.textContent = cls.title;
            if (classSelect) classSelect.appendChild(option);
  
            const uploadOption = document.createElement('option');
            uploadOption.value = cls._id;
            uploadOption.textContent = cls.title;
            if (uploadClassSelect) uploadClassSelect.appendChild(uploadOption);
        });
    } catch (error) {
        console.error('Error fetching classes:', error);
    }
  }
  