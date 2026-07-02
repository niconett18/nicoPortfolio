import { NextResponse } from 'next/server';
import { respond } from '../../../lib/chatbot';

export const runtime = 'nodejs';
export const maxDuration = 60;

const API_KEY = process.env.OPENCODE_ZEN_API_KEY || '';
const BASE_URL = process.env.OPENCODE_ZEN_BASE_URL || 'https://opencode.ai/zen/v1';
const MODEL = process.env.OPENCODE_ZEN_MODEL || 'deepseek-v4-flash-free';

const SYSTEM_PROMPT = `You are a friendly portfolio assistant for Nicholas Edmund Tanaka. Answer questions about his background, experience, projects, skills, and contact info.

FORMATTING RULES:
- Be conversational and detailed. Write 4-8 sentences per response. Elaborate on projects, tech choices, and outcomes.
- Use markdown links for all project names — format as [project name](url). Always link the project name when you mention it.
- Use markdown bold (**) sparingly for emphasis only (role titles, key skills).
- Use short paragraphs separated by blank lines. No bullet lists.
- Never use raw markdown characters like # or * outside of links and bold.
- Always include a friendly closing sentence inviting follow-up questions.
- HIGHLIGHT these 3 projects whenever relevant: Prime Capital Ledger, sumopower.id, and cloudream.id. Give them extra detail compared to others.

Here is his complete profile:

## Identity
- Full name: Nicholas Edmund Tanaka
- Title: Fullstack Developer / Computer Engineering student
- Location: Jakarta, Indonesia
- Email: nicholasedmund18@gmail.com

## Education
- B.Eng. in Computer Engineering at Universitas Indonesia, Depok (2024 — 2028)
- Engaged in academic projects, extracurricular activities, and research across computer engineering, with a focus on systems, software, and applied web technologies.

## Experience
1. **Freelance Web Developer** — Independent (2024 — Present)
   - Designed and developed sumopower.id and cloudream.id from scratch — covering UI/UX, frontend, backend, and deployment.
   - Managed full project lifecycle: client requirements gathering, implementation, and domain/hosting setup.
   - Delivered all projects as solo builds — owning architecture, code quality, and production-readiness end-to-end.

2. **Vice Head of Creative Marketing** — EXERCISE FTUI, Universitas Indonesia (Feb 2025 — Present)
   - Promoted from Creative Marketing Staff based on strong performance; now mentor junior staff and oversee event promotions.
   - Lead the creative team in digital marketing strategy, content planning, copywriting, and branding campaigns.

## Projects
1. **Prime Capital Ledger** (https://primecapitaledger.site) — Financial platform delivering a sleek, trust-driven interface for capital management.
2. **sumopower.id** (https://sumopower.id) — Commercial e-commerce platform architected for speed and seamless UX.
3. **cloudream.id** (https://cloudream.id) — B2B digital platform offering robust enterprise cloud solutions.
4. **Fore Nico** (https://fore-nico.vercel.app) — Innovative web project showcasing modern capabilities and clean architecture.
5. **G2M Church** (https://g2mchurch.vercel.app) — Digital platform engineered for community engagement.
6. **To-Do List by Nico** (https://todolistbynico.vercel.app) — High-performance productivity application emphasizing minimalist UX and solid state management.
7. **Idzhar Dwi Karya** (https://idzhardwikarya.vercel.app) — Corporate landing interface built with precision.

## Tech Stack
- **Frontend:** Next.js, React, Vite, TypeScript, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express, TypeScript, PostgreSQL, REST APIs
- **Tooling & DevOps:** Git, Docker, Linux, Vercel, CI/CD
- **Design & Other:** Figma, UI/UX, C, C++, Python, Java

## Contact
- Email: nicholasedmund18@gmail.com (best way to reach him)
- Always encourage visitors to reach out via email for collaborations, internships, or interesting product work.`;

function streamText(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Try upstream AI API first
    if (API_KEY) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const upstream = await fetch(`${BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            stream: true,
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
            temperature: 0.8,
            max_tokens: 800,
            thinking: { type: 'disabled' },
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (upstream.ok && upstream.body) {
          const encoder = new TextEncoder();
          const decoder = new TextDecoder();

          const stream = new ReadableStream({
            async start(controller) {
              const reader = upstream.body!.getReader();
              let buffer = '';
              let emittedContent = false;
              let reasoningFallback = '';

              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  buffer += decoder.decode(value, { stream: true });

                  const lines = buffer.split('\n');
                  buffer = lines.pop() || '';

                  for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith('data:')) continue;
                    const payload = trimmed.slice(5).trim();
                    if (payload === '[DONE]') continue;

                    try {
                      const json = JSON.parse(payload);
                      const delta = json.choices?.[0]?.delta || {};
                      if (typeof delta.content === 'string' && delta.content) {
                        emittedContent = true;
                        controller.enqueue(encoder.encode(delta.content));
                      } else if (typeof delta.reasoning_content === 'string') {
                        reasoningFallback += delta.reasoning_content;
                      }
                    } catch {
                      // ignore non-JSON keepalive lines
                    }
                  }
                }

                if (!emittedContent && reasoningFallback.trim()) {
                  controller.enqueue(encoder.encode(reasoningFallback.trim()));
                }
              } catch (err) {
                console.error('Stream relay error:', err);
              } finally {
                controller.close();
              }
            },
          });

          return new Response(stream, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'no-cache, no-transform',
              Connection: 'keep-alive',
            },
          });
        }

        console.error('AI API returned error:', upstream.status);
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          console.error('AI API request timed out');
        } else {
          console.error('AI API request failed:', err);
        }
      }
    }

    // Fallback: local response engine
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    const reply = lastUserMessage ? respond(lastUserMessage.content) : respond('');
    return streamText(reply);
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
