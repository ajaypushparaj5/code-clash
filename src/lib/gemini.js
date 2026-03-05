import { GoogleGenerativeAI } from "@google/generative-ai";

// Gather all available keys from the environment variables
const apiKeys = [
  import.meta.env.VITE_GEMINI_API_KEY_1 || import.meta.env.VITE_GEMINI_API_KEY, // Support new or old name
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3
].filter(Boolean); // Remove empty/undefined ones

/**
 * Execute a Gemini prompt with automatic fallback across multiple API keys.
 * If Key 1 fails (e.g., quota exceeded, bad key), it automatically tries Key 2, etc.
 */
const executeWithFallback = async (prompt) => {
  if (apiKeys.length === 0) {
    throw new Error("No Gemini API Keys configured. Please add VITE_GEMINI_API_KEY_1 to your .env file.");
  }

  let lastError;

  for (let i = 0; i < apiKeys.length; i++) {
    try {
      // Create a fresh instance and model for the current key in the loop
      const genAI = new GoogleGenerativeAI(apiKeys[i]);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(prompt);

      if (i > 0) {
        console.log(`[Gemini] Successfully used fallback API Key #${i + 1}`);
      }

      return result;
    } catch (error) {
      console.warn(`[Gemini] Warning: API Key #${i + 1} failed:`, error.message);
      lastError = error;
      // Loop continues to the next key...
    }
  }

  // If the loop finishes and we are down here, all keys failed
  throw new Error(`All ${apiKeys.length} Gemini API keys failed. Last error: ${lastError.message}`);
};

/**
 * Performs dynamic real-time analysis on code blocks.
 * Focused on syntax, basic logic, and keyword issues.
 */
export const getDynamicAnalysis = async (code, language) => {
  if (apiKeys.length === 0) return { error: "API Keys missing" };

  const prompt = `
You are a real-time code assistant inside a gamified coding platform.

Analyze ONLY the provided JavaScript code block.

Rules:
- Focus ONLY on syntax errors, wrong keywords, or clear logic mistakes.
- Do NOT explain theory.
- Each message must be under 15 words.
- Maximum 2 issues.
- Short, actionable feedback.
- Friendly game-style tone.

Code Block:
${code}

Return STRICT JSON ONLY:

{
  "issues": [
    {
      "title": "Short label",
      "type": "error | warning",
      "message": "Short actionable hint"
    }
  ]
}

Examples of good feedback:
"title": "Missing Semicolon"
"message": "Add ';' after statement"

"title": "Wrong Variable Scope"
"message": "Use 'let' instead of 'var' here"
`;

  try {
    const result = await executeWithFallback(prompt);
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
  if (apiKeys.length === 0) return { error: "API Keys missing" };

  const prompt = `
You are the "Moo-ntor", a highly intelligent but playful Minecraft-style cow who teaches coding in a gamified platform.

Analyze the JavaScript code and provide 3 to 5 short, comic-book style suggestions.

STRICT RULES:
- Exactly 3 to 5 suggestions in an array.
- Start each suggestion playfully. You can use text like "*Mooo...*", "*sniffs code*", "*chews cud*", etc.
- Keep each suggestion under 2 sentences.
- Use simple, encouraging language.
- Focus on time/space complexity, cleaner syntax, or logic improvement.

Code:
${code}

Return STRICT JSON:
{
  "suggestions": [
    "Mooo... *chews cud* I see a nested loop here! You might want to use a HashMap to make this O(n) instead of O(n²).",
    "*sniffs* This variable could be a 'const' instead of 'let'. It keeps the grass greener!",
    "Mooo! Great job overall. Just remember to return early to save processing time!"
  ]
}
`;

  try {
    const result = await executeWithFallback(prompt);
    let text = result.response.text();

    text = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error (Static):", error);
    return { error: 'Failed to analyze code. All keys might be exhausted.' };
  }
};

/**
 * Translates code from one language to another strictly without extra conversational text.
 */
export const translateCode = async (code, targetLanguage) => {
  if (apiKeys.length === 0) return { error: "API Keys missing" };

  const prompt = `
You are a highly accurate code translation engine. 
Translate the following code into ${targetLanguage}.

STRICT RULES:
- Provide ONLY the translated code.
- Do NOT include markdown code fences (like \`\`\`python).
- Do NOT include any explanations, introductory text, or concluding remarks.
- Strictly output the raw code.

Code to translate:
${code}
`;

  try {
    const result = await executeWithFallback(prompt);
    let text = result.response.text();
    // In case the model still outputs markdown fences despite instructions
    text = text.replace(/^\`\`\`[a-zA-Z]*\n/, '').replace(/\n\`\`\`$/, '');
    return text.trim();
  } catch (error) {
    console.error("Gemini API Error (Translate):", error);
    return "// Failed to translate code using all available API keys. Please try again.";
  }
};
