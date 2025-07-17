import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

const ChatUI = ({ questions, onSend, currentUser }) => {
  return (
    <div style={{ position: "relative", height: "600px", width: "100%" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {questions.map((q) => {
              // Fix: Use the correct field for the username
              const senderName = q.user || q.askedBy || "Anonymous";
              const isCurrentUser = senderName === currentUser;

              return (
                <Message
                  key={q._id}
                  model={{
                    message: q.content,
                    sentTime: "now",
                    sender: isCurrentUser ? "You" : senderName,
                    direction: isCurrentUser ? "outgoing" : "incoming",
                  }}
                >
                  <Avatar
                    name={isCurrentUser ? "You" : senderName}
                    src="/default-avatar.png"
                  />
                </Message>
              );
            })}
          </MessageList>
          <MessageInput placeholder="Type your question here..." onSend={onSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatUI;
