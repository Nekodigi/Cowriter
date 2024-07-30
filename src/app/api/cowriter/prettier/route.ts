//use open ai to fix mistake
//this is app route
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  //from query
  const searchParams = req.nextUrl.searchParams;
  const input = searchParams.get("input");
  if (!input)
    return Response.json({ error: "input is required" }, { status: 400 });
  //use chat api
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You spell and grammar checker. Only return result.",
      },
      {
        role: "user",
        content: "Please return sentence with correct grammar and spell",
      },
      { role: "user", content: input },
    ],
  });
  const res_text = res.choices[0].message.content;
  return Response.json({ text: res_text });
}
