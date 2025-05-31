# Resume GPT

A modern resume builder application that helps users create professional resumes with AI-powered suggestions.

## Features

- PDF resume parsing
- AI-powered resume suggestions
- Modern, responsive UI
- Multiple resume templates
- Real-time preview
- Export to PDF

## Tech Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- Shadcn UI
- PDF Parse
- OpenRouter AI

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your environment variables:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add your environment variables in the Vercel dashboard
6. Click "Deploy"

### Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `NEXT_PUBLIC_OPENROUTER_API_KEY`: Your OpenRouter API key for AI suggestions

## License

MIT
