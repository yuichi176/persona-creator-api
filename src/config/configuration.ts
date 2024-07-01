export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  geminiAPI: {
    baseUrl: process.env.GEMINI_API_BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
  },
})
