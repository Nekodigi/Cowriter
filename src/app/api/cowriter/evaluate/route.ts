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
      { role: "user", content: `Criteria: ${criteria}` },
      {
        role: "user",
        content: `Evaluate this idea list based on the last criteria. ONLY show my clearly insufficient point and tell me simple list format. Input: ${input}`,
      },
    ],
  });
  const res_text = res.choices[0].message.content;
  return Response.json({ text: res_text });
}
