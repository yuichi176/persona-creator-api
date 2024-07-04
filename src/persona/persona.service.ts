import { Injectable } from '@nestjs/common'
import { baseHttpClient } from '../lib/baseHttpClient'
import { z } from 'zod'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

@Injectable()
export class PersonaService {
  constructor(private configService: ConfigService) {}

  async generatePersona(
    age: string,
    gender: string,
    location: string,
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
    const USE_GEMINI_MOCK = this.configService.get('useMockGeminiAPI')
    let baseUrl
    if (USE_GEMINI_MOCK) {
      baseUrl = this.configService.get('mockGeminiAPIBaseUrl')
    } else {
      baseUrl = this.configService.get('geminiAPI.baseUrl')
    }
    const API_KEY = this.configService.get('geminiAPI.apiKey')

    // Create a prompt for the Gemini API
    // eslint-disable-next-line no-useless-escape
    const prompt = `Create Persona with the following condition.\\n\\n age:${age},gender:${gender},location:${location}${!otherFeatures ? '' : ',otherFeatures:' + otherFeatures}\\n\\n Using this JSON schema:\\n\\n Persona = {\"name\": str, \"age\": str, \"gender\": str, \"location: str\", \"occupation: str\", \"hobbies: str\", \"personality: str\"}\\n\\n Return a \`Persona\`\\n      `

    // Call the Gemini API to generate content
    const response = await baseHttpClient.post(
      `${baseUrl}/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
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

  async generateStreamPersona(
    age: string,
    gender: string,
    location: string,
    otherFeatures: string,
    res: Response,
  ) {
    const USE_GEMINI_MOCK = this.configService.get('useMockGeminiAPI')
    let baseUrl
    if (USE_GEMINI_MOCK) {
      baseUrl = this.configService.get('mockGeminiAPIBaseUrl')
    } else {
      baseUrl = this.configService.get('geminiAPI.baseUrl')
    }
    const API_KEY = this.configService.get('geminiAPI.apiKey')
    // Create a prompt for the Gemini API
    // eslint-disable-next-line no-useless-escape
    const prompt = `Create Persona with the following condition.\\n\\n age:${age},gender:${gender},location:${location}${!otherFeatures ? '' : ',otherFeatures:' + otherFeatures}\\n\\n Using this JSON schema:\\n\\n Persona = {\"name\": str, \"age\": str, \"gender\": str, \"location: str\", \"occupation: str\", \"hobbies: str\", \"personality: str\"}\\n\\n Return a \`Persona\`\\n      `

    // Call the Gemini API to generate content
    const response = await baseHttpClient.post(
      `${baseUrl}/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
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
        const { name, age, gender, location, occupation, hobbies, personality } =
          validateResult.data
        const profile = `# Name\\n${name}\\n# Age\\n${age}\\n# Gender\\n${gender}\\n# Location\\n${location}\\n# Occupation\\n${occupation}\\n# Hobbies\\n${hobbies}\\n# personality\\n${personality}`
        const chunks: string[] = []
        for (let i = 0; i < profile.length; i += 3) {
          chunks.push(profile.slice(i, i + 3))
        }
        await delay(1000)
        for (const chunk of chunks) {
          await delay(10)
          res.write(`data: ${chunk}\n\n`)
        }
        res.end()
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
