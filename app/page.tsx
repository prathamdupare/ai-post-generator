"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [post, setPost] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement the submit logic here
    function getHumanReadableDate() {
      const timestamp = Date.now();
      const date = new Date(timestamp);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const form = {
      time: getHumanReadableDate(),
      prompt,
      post,
    };

    console.log(form);

    const response = await fetch("api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await response.json();
    console.log(content);
    alert(content.data.tableRange);

    setPost("");
    setPrompt("");
  };

  return (
    <div className="flex h-screen  items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-[400px] shadow-sm">
        <form className="py-4 space-y-4" onSubmit={handleSubmit}>
          <Label>Prompt</Label>
          <Input
            type="text"
            name="prompt"
            value={prompt}
            onChange={handleChange}
            placeholder="Enter your prompt"
            className="border p-2 rounded w-full"
          />

          <Input
            type="text"
            name="post"
            value={post}
            onChange={handlePostChange}
            placeholder="Enter your prompt"
            className="border p-2 rounded w-full"
          />

          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </form>
      </div>

      <div className="bg-white p-6 rounded w-[400px] shadow-sm"></div>
    </div>
  );
}
