'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { fadeUp, staggerContainer } from '../lib/animations';

const SUGGESTIONS = [
  'What projects have you built?',
  'What tech stack do you use?',
  'Tell me about your experience',
  'How can I contact you?',
];

// Reads a streaming response body, invoking onText with the accumulated text
// on every chunk. Returns the full text ('' if the stream produced nothing).
async function readStream(body, onText) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let acc = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    acc += decoder.decode(value, { stream: true });
    onText(acc);
  }

  return acc;
}

export default function ChatSection() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm Nicholas's portfolio assistant. Ask me about his experience, projects, tech stack, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    setShowSuggestions(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "Sorry, I couldn't reach the AI service right now. Try again later.",
          },
        ]);
        return;
      }

      // Stream tokens in as they arrive. Append an empty assistant bubble,
      // then replace its content on every chunk so text appears progressively.
      const startedRef = { current: false };
      const full = await readStream(res.body, (text) => {
        if (!startedRef.current) {
          startedRef.current = true;
          setLoading(false); // hide typing dots once first token lands
          setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
        } else {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: text };
            return next;
          });
        }
      });

      // Edge case: stream closed with no tokens at all.
      if (!full) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "Sorry, I couldn't generate a response. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <section className="chat-section page-section">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.p variants={fadeUp} className="mono-label mono-label--accent">
          AI Assistant
        </motion.p>
        <motion.h2 variants={fadeUp} className="display-lg" style={{ marginTop: '0.85rem' }}>
          Ask anything
        </motion.h2>

        <motion.div variants={fadeUp} className="chat-container">
          <div className="chat-messages">
            {messages.length === 1 && showSuggestions && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="chat-chip"
                    onClick={() => sendMessage(s)}
                    disabled={loading}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
                <span className="chat-msg-avatar">
                  {msg.role === 'assistant' ? <Bot size={15} /> : <User size={15} />}
                </span>
                <div className="chat-msg-bubble">
                  <ReactMarkdown
                    components={{
                      a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg chat-msg--assistant">
                <span className="chat-msg-avatar">
                  <Bot size={15} />
                </span>
                <div className="chat-msg-bubble">
                  <span className="chat-dots">
                    <span className="chat-dot" />
                    <span className="chat-dot" />
                    <span className="chat-dot" />
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form className="chat-input-row" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Ask about Nicholas..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chat-send-btn"
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={16} strokeWidth={2} />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
