import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Performs dynamic real-time analysis on code blocks.
 * Focused on syntax, basic logic, and keyword issues.
 */
export const getDynamicAnalysis = async (code, language) => {
  if (!apiKey) return { error: "API Key missing" };

  const prompt = `Analyze this JAVASCRIPT code block found within curly braces.
  Focus ONLY on logic errors, syntax mistakes, or keyword misuse within this specific block.
  Be extremely concise (max 2 bullet points). 
  
  Code Block:
  ${code}
  
  Return JSON format: { "issues": [{ "title": "...", "type": "error|warning", "message": "..." }] }`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Simple JSON extraction in case Gemini wraps in markdown blocks
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Gemini Dynamic Error:", err);
    return { issues: [] };
  }
};

/**
 * Performs static deep analysis for complexity and teaching.
 */
export const getStaticAnalysis = async (code, language) => {
  if (!apiKey) return { error: "API Key missing" };

  const prompt = `Act as a senior software mentor. Analyze the following JAVASCRIPT code.
  Focus on:
  1. Time Complexity (Big O)
  2. Space Complexity (Big O)
  3. Architectural or algorithmic improvements.
  
  Provide a 'Teaching' perspective - explain WHY a change is better.
  Suggest a more 'Optimal Solution'.
  Suggest the Big O notation clearly.
  
  Code:
  ${code}
  
  Return JSON format: { 
    "complexity": { "time": "...", "space": "..." },
    "analysis": "...",
    "suggestion": "...",
    "optimalCode": "..."
  }`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Gemini Static Error:", err);
    return null;
  }
};
