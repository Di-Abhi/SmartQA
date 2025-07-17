import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatUI from "../components/ChatUI";
import { serverEndpoint } from "../config/appConfig";
import socket from "../config/socket";
import { useSelector } from "react-redux";

function Room() {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [room, setRoom] = useState(null);
  const [questions, setQuestions] = useState([]);

  const user = useSelector((state) => state.user.userDetails);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${serverEndpoint}/room/${code}`, {
        withCredentials: true,
      });
      setRoom(response.data);
    } catch (error) {
      console.error(error);
      setErrors({ message: "Unable to fetch room details, please try again" });
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${serverEndpoint}/room/${code}/question`,
        { withCredentials: true }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
      setErrors({ message: "Unable to fetch questions, please try again" });
    }
  };

  const handleQuestionSubmit = async (text) => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/room/${code}/question`,
        { content: text },
        { withCredentials: true }
      );

      setQuestions((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Error submitting question", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRoom();
      await fetchQuestions();
      setLoading(false);
    };

    fetchData();

    socket.emit("join-room", code);

    socket.on("new-question", (question) => {
      setQuestions((prev) => [question, ...prev]);
    });

    return () => {
      socket.off("new-question");
    };
  }, [code]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <p>Fetching room details...</p>
      </div>
    );
  }

  if (errors.message) {
    return (
      <div className="container text-center py-5">
        <p>{errors.message}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">
        Room {code} created by <strong>{room.createdBy}</strong>
      </h2>

      <ChatUI
        questions={questions}
        onSend={handleQuestionSubmit}
        currentUser={user?.name}
      />
    </div>
  );
}

export default Room;
