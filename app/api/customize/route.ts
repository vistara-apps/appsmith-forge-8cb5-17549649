
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: false,
})

export async function POST(request: NextRequest) {
  try {
    const { appId, instruction, currentCode } = await request.json()

    if (!instruction || !currentCode) {
      return NextResponse.json({ error: 'Instruction and current code are required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an expert at modifying React components for Farcaster mini-apps. 

Given the current code and a modification instruction, return the updated code that implements the requested changes.

Rules:
- Keep the existing functionality intact unless specifically asked to change it
- Maintain the component structure and styling approach
- Ensure the code remains a valid React component
- Include 'use client' directive
- Use Tailwind CSS for styling
- Return only the complete updated component code, no explanations

Current code:
${currentCode}

Modification instruction: ${instruction}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    })

    const updatedCode = completion.choices[0].message.content

    return NextResponse.json({
      updatedCode: updatedCode || currentCode,
      version: Date.now()
    })
  } catch (error) {
    console.error('Customization error:', error)
    return NextResponse.json(
      { error: 'Failed to customize mini-app' }, 
      { status: 500 }
    )
  }
}
