import React, { useEffect, useRef, useState } from "react";
import { getAllMessage } from "../redux/api/auth";
import Message from "./message";
import { IconButton, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import { getSocket } from "../socket";

export default function Chat({ roomId, user }) {
  const socket = getSocket();
  useEffect(() => {
    if (socket) {
      socket.emit("join chat", { roomId , userId:user.id });
      console.log(`Joined room: ${roomId}`);
    }
  }, [socket, roomId]);

  

  useEffect(() => {
    if (socket) {
      // Clean up any existing listener before adding a new one
      socket.off("receive_message");

      // Now attach the listener
      socket.on("receive_message", (data) => {
        console.log("Received message:", data);
        if (roomId !== data.roomId) return;

        setMessages((prev) => [...prev, data]);
      });
    }

    // Cleanup the listener when component unmounts
    return () => {
      if (socket) {
        // Clean up the listener
        socket.off("receive_message");
      }
    };
  }, [socket, roomId]);


  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getAllChat = async () => {
    const data = await getAllMessage(user.token, roomId);
    setMessages(data.data);
  };
  
  useEffect(() => {
    getAllChat();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    let data = {
      sender: user.id,
      roomId: roomId,
      content: message,
    };
    socket.emit("new_message", data);
    setMessage("");
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    let data = {
      sender: user.id,
      roomId: roomId,
      content: message,
    };
  };

  return (
    <>
      <Stack
        boxSizing="border-box"
        padding="1rem"
        spacing="1rem"
        height="90%"
        bgcolor="#bdbdbd5e"
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {messages?.map((i) => (
          <Message key={i?._id} message={i} user={user} />
        ))}

        {/* {
  userTyping && <TypingLoader/>
} */}
        <div ref={bottomRef} />
      </Stack>
      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack
          direction="row"
          height="100%"
          padding="1rem"
          alignItems="center"
          position="relative"
          className="d-flex justify-content-center"
        >
          <input
            style={{
              width: "400px",
            }}
            placeholder="Type message..."
            value={message}
            onChange={(e) => handleMessage(e)}
          />

          <IconButton
            sx={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            type="submit"
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
    </>
  );
}
