export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  useMockGeminiAPI: process.env.USE_MOCK_GEMINI_API_ === 'true',
  mockGeminiAPIBaseUrl: process.env.MOCK_GEMINI_API_BASE_URL,
  geminiAPI: {
    baseUrl: process.env.GEMINI_API_BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
  },
})
