import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();  // Corrected to lowercase "id"
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing data for the student with the given ID
        // and update the state (name and email) accordingly
        axios.get(`http://localhost:8081/${id}`)
            .then(res => {
                const task = res.data; // Assuming your API returns student data
                setName(task.name);
                setDescription(task.description);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, { name, description })
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
                    <h2>Update Task</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
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
                        <label htmlFor="description">Desc</label>
                        <input
                            type="text"
                            id="desc"
                            placeholder='Enter Description'
                            className='form-control'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateTask;
