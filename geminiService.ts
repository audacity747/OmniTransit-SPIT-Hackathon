
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCommuteAdvice(query: string, city: string, context?: string) {
  const model = 'gemini-3-flash-preview';
  
  const stationKnowledge = `
    OMNITRANSIT MUMBAI KNOWLEDGE:
    1. DADAR (Major Interchange):
       - Western PF 1/2 (Slow), PF 4/5 (Fast). Central PF 1/2 (Slow), PF 3/4 (Fast).
       - Connection: Middle FOB is most crowded. Use North or South FOB for switching.
    2. GHATKOPAR (Train-Metro Link):
       - PF 1 (Northbound) connects directly to Metro Line 1 concourse.
    3. ANDHERI (Train-Metro Link):
       - West Exit for Train stations, but Skywalk on East side leads directly to Metro 1 station.
    4. CROWD PATTERNS:
       - Morning Peak: Southbound (towards Churchgate/CSMT) is heavy.
       - Evening Peak: Northbound (towards Borivali/Thane) is heavy.
  `;

  const systemInstruction = `
    You are OmniTransit AI, the smart commute guide for MUMBAI.
    
    ${stationKnowledge}

    Current Journey Context: ${context || 'General Mumbai transit help.'}
    
    Guidelines:
    - Use "Mumbaikar" terms: FOB, First Class, Ladies, Slow/Fast, Local.
    - Be precise about interchanges. If a user asks how to get from Thane to Borivali, explain that there is NO direct train and they must switch at Dadar or use the Metro via Ghatkopar.
    - Suggest optimal coach positions (Front/Middle/Back) for faster exits.
    - Maintain a helpful, quick, and savvy "local guide" personality.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal failure on my end, Mumbaikar! Please check the station indicators for now.";
  }
}
