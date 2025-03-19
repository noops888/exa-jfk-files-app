'use client';

import { useChat } from 'ai/react';
import { useRef } from 'react';
import MessageContent from './components/MessageContent';
import SuggestedQuestions from './components/SuggestedQuestions';


export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat();
  const hasMessages = messages.length > 0;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSelectQuestion = (question: string) => {
    setInput(question);
    // Use setTimeout to ensure setInput has completed before submitting
    setTimeout(() => {
      if (formRef.current) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        formRef.current.dispatchEvent(event);
      }
    }, 0);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="md:max-w-5xl mx-auto px-3 md:px-6 py-2 flex justify-between items-center">
          <a
            href="https://dashboard.exa.ai/playground/search?q=JFK%20assassination%20files&filters=%7B%22text%22%3A%22true%22%2C%22type%22%3A%22neural%22%2C%22useAutoprompt%22%3Atrue%2C%22numResults%22%3A100%2C%22includeDomains%22%3A%5B%22www.archives.gov%22%5D%2C%22startCrawlDate%22%3A%222025-03-16T18%3A30%3A01.000Z%22%7D"
            target="_blank"
            className="flex items-center px-3 md:px-4 py-1 md:py-1.5 bg-white border-2 border-[var(--brand-default)] text-[var(--brand-default)] 
            rounded-full hover:bg-[var(--brand-default)] hover:text-white transition-all duration-200 
            font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="text-sm">JFK Files Search API</span>
          </a>
          <a
            href="https://github.com/exa-labs/jfk-files-app"
            target="_blank"
            className="flex items-center gap-1 md:gap-1.5 text-sm md:text-md text-gray-600 hover:text-[var(--brand-default)] transition-colors"
          >
            <span className="underline">View Source Code</span>
            <svg
              className="w-3 h-3 md:w-3.5 md:h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="md:max-w-5xl mx-auto px-3 md:px-6 py-4 md:py-6 pt-16 md:pt-20 pb-20 md:pb-24 space-y-4 md:space-y-6">
        <div className="space-y-4 md:space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg py-2 md:py-3 px-3 md:px-4 max-w-[90%] md:max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-[var(--secondary-darker)] rounded text-black text-sm md:text-base'
                      : 'text-gray-900 text-sm md:text-base'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-[14px] md:text-[15px] break-words overflow-hidden">
                    <MessageContent content={message.content} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-1 text-gray-500 animate-pulse ml-3 md:ml-4 mb-4 md:mb-6">
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[var(--secondary-accent2x)] animate-[bounce_1s_infinite]"></div>
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[var(--secondary-accent2x)] animate-[bounce_1s_infinite_200ms]"></div>
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[var(--secondary-accent2x)] animate-[bounce_1s_infinite_400ms]"></div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form - centered when no messages, fixed bottom otherwise */}
      <div className={`${
        hasMessages 
          ? 'fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t' 
          : 'flex flex-col items-center justify-center bg-transparent'
        } z-40 transition-all duration-300 ${!hasMessages ? '-mt-10 md:my-10' : ''}`}>
        <div className={`${
          hasMessages 
            ? 'w-full md:max-w-5xl mx-auto px-4 md:px-6 py-4 relative' 
            : 'w-full md:max-w-3xl mx-auto px-4 md:px-6'
          }`}>
          {!hasMessages && (
            <div className="text-center pb-4 md:pb-8">
              <h1 className="text-3xl md:text-6xl font-medium text-gray-800 mb-3 md:mb-4 mt-0 md:mt-0">Chat with JFK Files</h1>
              <p className="text-md md:text-xl text-gray-600 mb-6 px-4 max-w-3xl mx-auto">find hidden secrets in those 80 thousand pages of JFK files</p>
            </div>
          )}
          {hasMessages && (
            <div className="absolute -top-8 right-4 md:right-6">
              <a
                href="https://jfk.exa.ai"
                target="_blank"
                className="text-sm text-gray-500 hover:text-[var(--brand-default)] transition-colors duration-200"
              >
                New chat ↗
              </a>
            </div>
          )}
          <form ref={formRef} onSubmit={handleSubmit} className="relative flex w-full">
            <input
              value={input}
              onChange={handleInputChange}
              autoFocus
              placeholder="Ask something..."
              className="w-full p-3 md:p-4 pr-[100px] md:pr-[130px] bg-white border border-gray-200 rounded-full shadow-sm 
              focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)] focus:ring-opacity-20 
              focus:border-[var(--brand-default)] text-sm md:text-base transition-all duration-200 
              placeholder:text-gray-400 hover:border-gray-300"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 md:px-6 py-2 md:py-2.5 bg-[var(--brand-default)] 
              text-white rounded-full shadow-sm hover:bg-[var(--brand-muted)] disabled:opacity-50 
              disabled:cursor-not-allowed font-medium text-sm md:text-base min-w-[80px] md:min-w-[110px] transition-all duration-200 
              hover:shadow-md active:transform active:scale-95"
            >
              Ask
            </button>
          </form>
          
          {!hasMessages && (
            <>
              <div className="mt-6 md:mt-10">
                <SuggestedQuestions 
                  onSelectQuestion={handleSelectQuestion} 
                  isLoading={isLoading}
                />
              </div>

              <div className="text-center pt-4 md:mt-6 text-gray-600 text-xs md:text-sm px-4">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>Searching JFK files</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-[bounce_1s_infinite]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-[bounce_1s_infinite_200ms]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-[bounce_1s_infinite_400ms]"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <span>powered by </span>
                    <a href="https://exa.ai" target="_blank" className="underline hover:text-[var(--brand-default)]">
                      Exa - The Web Search API
                    </a>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}