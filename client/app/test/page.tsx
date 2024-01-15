"use client";

import axios from "axios";
import React from "react";

export default function Page() {
  const handleCreateIdea = async () => {
    try {
      const response = await axios.post(`/api/idea`, {
        title: "Test idea 1",
        category: "education",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyIdeas = async () => {
    try {
      const response = await axios.get(`/api/idea/my`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full p-5 min-h-screen flex justify-start items-start gap-10">
      <button onClick={handleCreateIdea}>create idea</button>
      <button onClick={fetchMyIdeas}>my ideas</button>
    </div>
  );
}
