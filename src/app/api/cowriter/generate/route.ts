//use open ai to fix mistake
//this is app route
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  //from query
  const searchParams = req.nextUrl.searchParams;
  const input = searchParams.get("input");
  const exemplary = searchParams.get("exemplary");
  if (!input || !exemplary)
    return Response.json(
      { error: "input and exemplary is required" },
      { status: 400 }
    );
  //use chat api
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: `Exemplary: ${exemplary}` },
      {
        role: "user",
        content: `Generate ready to public article from idea list based on exemplary article. ${input}`,
      },
    ],
  });
  const res_text = res.choices[0].message.content;
  return Response.json({ text: res_text });
}
