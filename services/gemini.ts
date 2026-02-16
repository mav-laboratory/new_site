
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateQuizFeedback(answers: string[]) {
  const prompt = `
    Ein potenzieller Kunde hat ein Branding-Quiz auf der Website von Marc Verl (Logo & Brand Designer für nachhaltige Unternehmen) ausgefüllt.
    Antworten:
    ${answers.map((a, i) => `Frage ${i + 1}: ${a}`).join('\n')}

    Erstelle ein kurzes, professionelles und motivierendes Feedback (ca. 2-3 Sätze) auf Deutsch, das den Status Quo der Marke analysiert und Marc Verls Expertise subtil einfließen lässt. 
    Vermeide Floskeln. Sei direkt und strategisch.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Feedback Error:", error);
    return "Vielen Dank für deine Antworten. Deine Marke hat großes Potenzial für den ökologischen Wandel. Lass uns gemeinsam den nächsten Schritt gehen.";
  }
}
