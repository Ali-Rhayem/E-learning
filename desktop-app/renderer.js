const addClassForm = document.getElementById('add-class-form');
const classSelect = document.getElementById('class-select');
const studentsList = document.getElementById('students-list');
const uploadFileForm = document.getElementById('upload-file-form');
const uploadClassSelect = document.getElementById('upload-class-select');
const withdrawalRequestsList = document.getElementById('withdrawal-requests-list');


async function fetchClasses() {
    const response = await fetch('http://localhost:5000/api/classes/getAll');
    const classes = await response.json();

    classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls._id;
        option.textContent = cls.title;
        classSelect.appendChild(option);

        const uploadOption = document.createElement('option');
        uploadOption.value = cls._id;
        uploadOption.textContent = cls.title;
        uploadClassSelect.appendChild(uploadOption);
    });
}

classSelect.addEventListener('change', async () => {
    const classId = classSelect.value;
    const response = await fetch(`http://localhost:5000/api/classes/${classId}/students`);
    const students = await response.json();
    studentsList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = student.username;
        studentsList.appendChild(li);
    });
});

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


document.getElementById('upload-file-form').addEventListener('submit', async (event) => {
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



async function fetchWithdrawalRequests() {
    try {
        const response = await fetch('http://localhost:5000/api/withdrawal-requests/getAll');
        const requests = await response.json();
        withdrawalRequestsList.innerHTML = '';
        requests.forEach(request => {
            const li = document.createElement('li');
            li.textContent = `Student: ${request.userId.username}, Class: ${request.classId.title}, Status: ${request.status}`;
            const approveButton = document.createElement('button');
            approveButton.textContent = 'Approve';
            approveButton.onclick = async () => {
                await updateRequestStatus(request._id, 'approved');
                fetchWithdrawalRequests();
            };
            const rejectButton = document.createElement('button');
            rejectButton.textContent = 'Reject';
            rejectButton.onclick = async () => {
                await updateRequestStatus(request._id, 'rejected');
                fetchWithdrawalRequests();
            };
            li.appendChild(approveButton);
            li.appendChild(rejectButton);
            withdrawalRequestsList.appendChild(li);
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

fetchClasses();
fetchWithdrawalRequests();
