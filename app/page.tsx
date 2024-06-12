"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";

export default function Home() {
  const { toast } = useToast();

  const [prompt, setPrompt] = useState("");
  const [post, setPost] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleAiSubmit = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast({
      title: "Saving...Please Wait...",
    });

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

    toast({
      title: "Saved post into Google Sheet.",
      description: getHumanReadableDate(),
    });

    setPrompt("");
    setPost("");
    setAiResponse("");
    setCanSubmit(false);
  };

  return (
    <div className="flex h-screen items-center justify-center  shadow">
      <div className="flex flex-col md:flex-row gap-10  p-6 rounded w-[600px] shadow-sm">
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
          <div className="mt-4 p-4 border rounded ">
            <p>Generated Post:</p>
            <p>{aiResponse}</p>
          </div>
        ) : (
          <div className="flex rounded items-center justify-center">
            <div className="">
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-[300px] bg-gray-200 h-[20px] rounded-full" />

                  <Skeleton className="w-[100px] bg-gray-200 h-[20px] rounded-full" />
                </div>
              ) : (
                <p className="p-2">AI generated post will be shown here.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
