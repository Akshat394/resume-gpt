import { NextResponse } from "next/server";

const AWAN_API_KEY = process.env.AWAN_API_KEY;
const AWAN_API_URL = "https://api.awanllm.com/v1/chat/completions";

export async function POST(req: Request) {
  try {
    if (!AWAN_API_KEY) {
      throw new Error("Awan API key is not configured");
    }

    const { prompt } = await req.json();

    const response = await fetch(AWAN_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AWAN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.1-70B-Instruct",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Awan API error:", errorData);
      throw new Error(`Failed to get response: ${errorData}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to get response",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 