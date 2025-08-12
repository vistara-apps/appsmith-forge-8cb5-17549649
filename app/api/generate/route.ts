
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: false,
})

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an expert Farcaster mini-app generator. Given a user prompt, generate a complete mini-app structure.

Return a JSON object with:
- miniappType: A short descriptive name for the app type
- generatedCode: The complete React component code for the mini-app
- deployedUrl: A mock URL where the app would be deployed
- monetizationSuggestions: Array of suggested monetization strategies

The generated code should:
- Be a complete React component using hooks
- Include proper styling with Tailwind CSS
- Be interactive and functional
- Follow Farcaster mini-app best practices
- Include 'use client' directive
- Be self-contained with no external dependencies beyond React and Tailwind

Example response format:
{
  "miniappType": "Poll Voting App",
  "generatedCode": "...",
  "deployedUrl": "https://forge-apps.base.mini/poll-123",
  "monetizationSuggestions": ["Tip jar for poll creators", "Premium poll analytics"]
}`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const result = completion.choices[0].message.content
    
    try {
      const parsedResult = JSON.parse(result || '{}')
      return NextResponse.json(parsedResult)
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      return NextResponse.json({
        miniappType: "Custom Mini App",
        generatedCode: `'use client'\n\nexport default function CustomApp() {\n  return (\n    <div className="p-6 bg-white rounded-lg">\n      <h2 className="text-xl font-bold mb-4">Generated App</h2>\n      <p className="text-gray-600">${prompt}</p>\n      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">\n        Interact\n      </button>\n    </div>\n  )\n}`,
        deployedUrl: `https://forge-apps.base.mini/app-${Date.now()}`,
        monetizationSuggestions: ["Tip jar", "Premium features"]
      })
    }
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate mini-app' }, 
      { status: 500 }
    )
  }
}
