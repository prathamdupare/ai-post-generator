import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const configuration = {
      apiKey: process.env.OPENAI_API_KEY,
    };
    const openai = new OpenAI(configuration);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: body.messages }],
      max_tokens: 100,
    });

    const message = response.choices[0].message;

    return NextResponse.json({ output: message }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message ?? "Something went wrong",
      },
      { status: 500 },
    );
  }
}
