"use client";

import { ourAxios } from "@/lib/axios";
import React from "react";

export default function Page() {
  const handleCreateIdea = async () => {
    try {
      const response = await ourAxios.post(`/api/idea`, {
        title: "Travel idea 1",
        categories: ["20f76c57-7667-4d02-bced-11f4f1cd7861"],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyIdeas = async () => {
    try {
      const response = await ourAxios.get(`/api/idea/my`);
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
