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
                text: '{"name": "Kenji Sato", "age": "25", "gender": "Male", "location": "Tokyo", "occupation": "Software Engineer", "hobbies": "Hiking, Photography, Gaming", "personality": "Kenji is a quiet and introspective individual. He is deeply passionate about his work and takes pride in his attention to detail. He is known for his calm demeanor and ability to think critically under pressure. Kenji enjoys spending time in nature, finding solace in the serenity of hiking trails and capturing the beauty of his surroundings through photography. His love for cooking allows him to express his creativity and provide for his family with delicious meals. Despite his reserved nature, Kenji has a warm and compassionate heart, always willing to lend a helping hand to those in need.", "currentSituation": "Kenji is currently working on a challenging project at a renowned tech company in Tokyo. He is excited about the opportunity to contribute to cutting-edge technologies and collaborate with a talented team of engineers. He enjoys the stimulating environment and the constant learning opportunities. While he finds his work fulfilling, Kenji also craves a sense of balance in his life. He is actively seeking ways to incorporate more mindfulness and self-care practices into his busy schedule, hoping to create a healthier and more fulfilling lifestyle."}\n',
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
