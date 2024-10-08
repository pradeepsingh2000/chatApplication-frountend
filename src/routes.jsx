import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Room from "./pages/room";
import { SocketProvider } from "./socket"; // Import SocketProvider

const ReactRoutes = () => {
  return (
    // Wrap the entire Routes with SocketProvider
    <SocketProvider>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </SocketProvider>
  );
};

export default ReactRoutes;
