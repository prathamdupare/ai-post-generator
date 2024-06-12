"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = async () => {
  const getPostsData = async () => {
    const response = await fetch(`https://postai.fosspage.com/api/getPosts`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  const data = await getPostsData();
  console.log(data);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((post: any, index: number) => (
          <Card key={index} className="h-full flex flex-col justify-between">
            <CardHeader>
              <CardDescription>Prompt</CardDescription>

              <CardDescription>{post[1]}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{post[2]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
