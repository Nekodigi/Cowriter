//use open ai to fix mistake
//this is app route
import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  //from query
  const searchParams = req.nextUrl.searchParams;
  const input = searchParams.get("input");
  const criteria = searchParams.get("criteria");
  if (!input || !criteria)
    return Response.json(
      { error: "input and criteria is required" },
      { status: 400 }
    );
  //use chat api
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "",
        // "You are assistant to add few more interesting detail to user idea list by adding new item in the list not overwrite. Keep it simple as possible as this is still idea phase.",
      },
      { role: "user", content: `Criteria: ${criteria}` },
      {
        role: "user",
        content: `Insert item to the list. Based on the existing item in the list, add additional FACT. Search on web if you need. DON'T replace the existing item. Return list include both original and new item. Input: ${input}`,
      },
    ],
  });
  const res_text = res.choices[0].message.content;
  return Response.json({ text: res_text });
}
