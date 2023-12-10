import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { name, email })
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
                    <h2>Add Task</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name Task</label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter Task'
                            className='form-control'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Desc</label>
                        <input
                            type="text"
                            id="desc"
                            placeholder='Enter Desc'
                            className='form-control'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;
