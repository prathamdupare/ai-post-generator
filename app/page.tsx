"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [post, setPost] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleAiSubmit = async () => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: prompt }),
    });

    const content = await response.json();
    console.log(content);
    setAiResponse(content.output.content);
    setPost(content.output.content);
    setCanSubmit(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await response.json();
    alert(content.data.tableRange);

    setPrompt("");
    setPost("");
    setAiResponse("");
    setCanSubmit(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 shadow">
      <div className="flex gap-10 bg-white p-6 rounded w-[600px] shadow-sm">
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
            placeholder="Generated post will appear here"
            className="border p-2 rounded w-full"
            readOnly
          />

          <div className="flex gap-2">
            <Button type="button" onClick={handleAiSubmit} className="mt-2">
              Generate Post
            </Button>

            <Button type="submit" className="mt-2" disabled={!canSubmit}>
              Submit
            </Button>
          </div>
        </form>

        {aiResponse ? (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <p>Generated Post:</p>
            <p>{aiResponse}</p>
          </div>
        ) : (
          <div>AI generated post will be shown here.</div>
        )}
      </div>
    </div>
  );
}
