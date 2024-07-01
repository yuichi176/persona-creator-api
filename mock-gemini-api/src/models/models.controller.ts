export class ModelsController {
  constructor() {}

  public generateContent = (req: any, reply: any) => {
    reply.header('Content-Type', 'application/json').code(200)
    reply.send({
      candidates: [
        {
          content: {
            parts: [
              {
                text: '{"name": "Kenji Sato", "age": "25", "gender": "male", "location": "Tokyo", "occupation": "Software Engineer", "hobbies": "Hiking, Photography, Gaming", "personality": "Introverted, Creative, Ambitious"}\n',
              },
            ],
            role: 'model',
          },
          finishReason: 'STOP',
          index: 0,
          safetyRatings: [
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              probability: 'NEGLIGIBLE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              probability: 'NEGLIGIBLE',
            },
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              probability: 'NEGLIGIBLE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              probability: 'NEGLIGIBLE',
            },
          ],
        },
      ],
      usageMetadata: {
        promptTokenCount: 79,
        candidatesTokenCount: 68,
        totalTokenCount: 147,
      },
    })
  }
}
