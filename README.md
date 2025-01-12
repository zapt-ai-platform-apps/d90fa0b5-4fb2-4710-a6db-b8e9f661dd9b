# AI Assistance App

## Overview
The AI Assistance App provides users with a suite of AI-powered tools including drawing images, answering questions, interpreting dreams, converting text to speech, and interpreting PDF documents. The app leverages reliable AI services to deliver high-quality and detailed responses in various formats such as text, images, and audio.

## User Journeys
1. [Ask AI Anything](docs/journeys/ask-ai-anything.md) - Get detailed answers to your questions.
2. [AI Draw Picture](docs/journeys/ai-draw-picture.md) - Generate images based on your descriptions.
3. [PDF Interpretation](docs/journeys/pdf-interpretation.md) - Upload and get detailed interpretations of your PDFs.
4. [Dream Interpretation](docs/journeys/dream-interpretation.md) - Receive detailed interpretations of your dreams.
5. [Text to Speech](docs/journeys/text-to-speech.md) - Convert your text into speech audio.

## External APIs
- **ZAPT**: Used for authenticating users and handling AI event requests.
- **Resend**: Utilized for sending emails within the app.

Ensure to add the required environment variables listed in the `.env` file to configure these services.

---