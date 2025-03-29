# persona-creator-api
BackEnd for persona creator.

## Requirements

* Node.js >= 20.15.0

## Getting Started
1. Clone the repository

```shell
$ git clone git@github.com:yuichi176/persona-creator-api.git
```

2. Install dependencies

```shell
$ npm install
```

3. Set up environment variables

Create `.env.local` file in the root directory and set the following environment variables.

| Name                     | Description                              |
|--------------------------|------------------------------------------|
| PORT                     | Port number on which the server will run |
| USE_MOCK_GEMINI_API      | Set `true` to mock gemini api            |
| MOCK_GEMINI_API_BASE_URL | Base URL for the mock Gemini API         |
| GEMINI_API_BASE_URL      | Base URL for the Gemini API              |
| GEMINI_API_KEY           | API key for accessing the Gemini API     |

4. Run the development server
```shell
$ npm run start:dev
```
