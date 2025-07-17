import React, { useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../config/appConfig';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!name.trim()) {
            isValid = false;
            newErrors.name = 'Name is mandatory';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const response = await axios.post(`${serverEndpoint}/room`, {
                    createdBy: name
                }, {
                    withCredentials: true
                });
                const roomCode = response.data.roomCode;
                navigate(`/room/${roomCode}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className='container text-center py-5'>
            <h2 className='mb-4'>Create Room</h2>
            <div className='row justify-content-center'>
                <div className='col-md-5'>
                    <div className='mb-3'>
                        <label htmlFor='name'>Full Name:</label>
                        <input
                            type='text'
                            className={`form-control ${errors.name ? 'is-invalid' : name ? 'is-valid' : ''}`}
                            id='name'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                    <div className='mb-3'>
                        <button type='button' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
