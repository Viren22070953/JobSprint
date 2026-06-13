const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100),

  technicalQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string()
  })).min(1),

  behavioralQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string()
  })).min(1),

  skillGaps: z.array(z.object({
    skill: z.string(),
    severity: z.enum(["low", "medium", "high"])
  })).min(1),

  preparationPlan: z.array(z.object({
    day: z.number(),
    focus: z.string(),
    tasks: z.array(z.string()).min(1)
  })).min(1)
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const prompt = `
You are an interview report generator.

Return ONLY valid JSON.
Do not return markdown.
Do not return explanation.
Do not return array.
Do not add extra fields.
Do not use -1 or placeholder values.

Return exactly this JSON structure:

{
  "matchScore": Number between 1 to 100,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "string",
      "tasks": ["string"]
    }
  ]
}

Generate at least:
- 5 technicalQuestions
- 3 behavioralQuestions
- 3 skillGaps
- 7 days preparationPlan

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const result = JSON.parse(response.text);

  const validatedResult = interviewReportSchema.parse(result);

  return validatedResult;
}

module.exports = generateInterviewReport;