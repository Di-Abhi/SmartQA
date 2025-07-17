import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverEndpoint } from '../config/appConfig';

const JoinRoom = () => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!name.trim()) {
      isValid = false;
      newErrors.name = 'Name is required';
    }

    if (!roomCode.trim()) {
      isValid = false;
      newErrors.roomCode = 'Meeting code is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      localStorage.setItem("participant-name", name);
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div className='container text-center py-5'>
      <h2 className='mb-4'>Join Room</h2>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <div className='mb-3'>
            <label htmlFor='name'>Full Name:</label>
            <input
              type='text'
              className={`form-control ${errors.name ? 'is-invalid' : name ? 'is-valid' : ''}`}
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='code'>Meeting Code:</label>
            <input
              type='text'
              className={`form-control ${errors.roomCode ? 'is-invalid' : roomCode ? 'is-valid' : ''}`}
              id='code'
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            {errors.roomCode && <div className='invalid-feedback'>{errors.roomCode}</div>}
          </div>

          {errors.server && (
            <div className='alert alert-danger mt-2'>{errors.server}</div>
          )}

          <div className='mb-3'>
            <button
              type='button'
              onClick={handleSubmit}
              className='btn btn-primary'
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
