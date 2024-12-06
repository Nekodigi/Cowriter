//use open ai to fix mistake
//this is app route
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  //from query
  const searchParams = req.nextUrl.searchParams;
  const input = searchParams.get("input");
  const query = searchParams.get("query");
  if (!input || !query)
    return Response.json(
      { error: "input and query is required" },
      { status: 400 }
    );
  //use chat api
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: query,
      },
      { role: "user", content: input },
    ],
  });
  const res_text = res.choices[0].message.content;
  return Response.json({ text: res_text });
}
