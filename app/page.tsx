'use client';

import { useChat } from 'ai/react';
import MessageContent from './components/MessageContent';


export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="md:max-w-5xl mx-auto px-3 md:px-6 py-2 md:py-3 flex justify-between items-center">
          <a
            href="https://dashboard.exa.ai"
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
                  <div className="whitespace-pre-wrap text-[14px] md:text-[15px]">
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
          : 'fixed inset-0 flex items-center justify-center bg-transparent'
        } z-40 transition-all duration-300`}>
        <div className={`${
          hasMessages 
            ? 'w-full md:max-w-5xl mx-auto px-4 md:px-6 py-4' 
            : 'w-full md:max-w-2xl mx-auto px-4 md:px-6'
          }`}>
          {!hasMessages && (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Chat with JFK Files</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 px-4 max-w-3xl mx-auto">find hidden secrets in those 80 thousand pages of JFK files</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="relative flex w-full">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask something..."
              className="w-full p-3 md:p-4 pr-[100px] md:pr-[130px] bg-white border border-gray-200 rounded-full shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-[var(--brand-default)] focus:ring-opacity-20 
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
            <div className="text-center mt-4 md:mt-6 text-gray-600 text-xs md:text-sm px-4">
              <span>powered by </span>
              <a href="https://exa.ai" target="_blank" className="underline hover:text-[var(--brand-default)]">
                Exa - The Web Search API
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}