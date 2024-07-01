import { Injectable } from '@nestjs/common'
import { baseHttpClient } from '../lib/baseHttpClient'
import { z } from 'zod'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PersonaService {
  constructor(private configService: ConfigService) {}

  async generatePersona(
    age: string,
    gender: string,
    otherFeatures: string,
  ): Promise<
    | Persona
    | {
        error: {
          reason: string
          message: string
        }
      }
  > {
    const GEMINI_API_URL = this.configService.get('geminiAPI.baseUrl')
    const API_KEY = this.configService.get('geminiAPI.apiKey')

    // Create a prompt for the Gemini API
    // eslint-disable-next-line no-useless-escape
    const prompt = `Create Persona with the following condition.\\n\\n age:${age},gender:${gender},otherFeatures:${otherFeatures}\\n\\n Using this JSON schema:\\n\\n Persona = {\"name\": str, \"age\": str, \"gender\": str, \"location: str\", \"occupation: str\", \"hobbies: str\", \"personality: str\"}\\n\\n Return a \`Persona\`\\n      `

    // Call the Gemini API to generate content
    const response = await baseHttpClient.post(
      `${GEMINI_API_URL}/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          response_mime_type: 'application/json',
          temperature: 0.8,
        },
      },
      undefined,
      (responseData) => {
        const result = generatePersonaResponseSchema.safeParse(responseData)
        if (result.success) {
          return { isValid: true, data: result.data }
        }
        return { isValid: false, error: result.error }
      },
    )

    if (response.error) {
      return {
        error: response.error,
      }
    }

    const rowPersona = response.data.candidates[0].content.parts[0].text
    try {
      const jsonPerson = JSON.parse(rowPersona)
      const validateResult = personaSchema.safeParse(jsonPerson)
      if (validateResult.success) {
        return validateResult.data
      }
      return {
        error: {
          reason: 'ValidationError',
          message: 'Failed to validate response from Gemini API',
        },
      }
    } catch (error) {
      console.error(error)
      return {
        error: {
          reason: 'InvalidResponse',
          message: 'Failed to parse response from Gemini API',
        },
      }
    }
  }
}

const generatePersonaResponseSchema = z.object({
  candidates: z.array(
    z.object({ content: z.object({ parts: z.array(z.object({ text: z.string() })) }) }),
  ),
})

const personaSchema = z.object({
  name: z.string(),
  age: z.string(),
  gender: z.string(),
  location: z.string(),
  occupation: z.string(),
  hobbies: z.string(),
  personality: z.string(),
})
export type Persona = z.infer<typeof personaSchema>
