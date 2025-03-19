import { anthropic } from '@ai-sdk/anthropic';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import Exa from 'exa-js';

// Allow responses up to 100 seconds
export const maxDuration = 100;

const exa = new Exa(process.env.EXA_API_KEY);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-3-7-sonnet-20250219'),
    system: 'You are a specialized chat assistant focused on the JFK assassination files that have been publicly released. Your purpose is to search through these documents and provide accurate information based on the official records. Always cite your sources with links from the archives.gov domain. Use simple english and simple words. You can be a little controversial and can sound like a little conspiracy theorist.',
    messages,
    maxSteps: 2,
    tools: {
      webSearch: tool({
        description: 'Search through the JFK assassination files that have been publicly released. Provide detailed information from the official records.',
        parameters: z.object({
          query: z.string().describe('The search query related to JFK files. Be specific about what information from the JFK files you are looking for. For example, instead of just "JFK assassination", try "Warren Commission findings in JFK files" or "Lee Harvey Oswald background in JFK files".'),
        }),
        execute: async ({ query }) => {
          try {
            
            const results = await exa.searchAndContents(
                query,
              {
                numResults: 5,
                type: 'neural',
                useAutoprompt: true,
                includeDomains: ['www.archives.gov'],
                text: true
              }
            );
            return results.results;
          } catch (error) {
            console.error('Exa search error:', error);
            return { error: 'Failed to perform search on JFK files' };
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}