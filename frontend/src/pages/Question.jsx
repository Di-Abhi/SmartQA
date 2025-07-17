import React, { useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../config/appConfig';

const Question = ({ roomCode }) => {
  const [question, setQuestion] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (question.trim().length === 0) {
      isValid = false;
      newErrors.question = 'Question is mandatory';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const participantName = localStorage.getItem("participant-name");

        const response = await axios.post(
          `${serverEndpoint}/room/${roomCode}/question`,
          { content: question },
          { withCredentials: true }
        );

        console.log(response);
        setQuestion('');
        setErrors({});
      } catch (error) {
        console.error(error);
        setErrors({
          message: 'Error posting question, please try again',
        });
      }
    }
  };

  return (
    <div className="container py-5">
      <h2>Question Form</h2>
      <h5 className="mb-2">Question</h5>
      <div className="mb-2">
        <textarea
          id="question"
          name="question"
          className={`form-control ${errors.question ? 'is-invalid' : ''}`}
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter Question"
        />
        {errors.question && (
          <div className="invalid-feedback">{errors.question}</div>
        )}
      </div>

      {errors.message && (
        <div className="alert alert-danger mt-2">{errors.message}</div>
      )}

      <div className="mb-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary w-100"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Question;
