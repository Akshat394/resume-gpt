export const callMixtral = async (userPrompt: string) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userPrompt }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to get response: ${error}`);
  }
  
  const data = await res.json();
  return data.choices[0].message.content;
}; 