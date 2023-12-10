import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();  // Corrected to lowercase "id"
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing data for the student with the given ID
        // and update the state (name and email) accordingly
        axios.get(`http://localhost:8081/${id}`)
            .then(res => {
                const student = res.data; // Assuming your API returns student data
                setName(student.name);
                setEmail(student.email);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, { name, email })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-centre align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name Task</label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Desc</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;
