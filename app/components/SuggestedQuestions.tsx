import React from 'react';

interface SuggestedQuestionProps {
  text: string;
  onClick: (question: string) => void;
  isLoading: boolean;
}

const SuggestedQuestion: React.FC<SuggestedQuestionProps> = ({ text, onClick, isLoading }) => {
  return (
    <button
      onClick={() => onClick(text)}
      disabled={isLoading}
      className={`w-full p-3 md:p-4 bg-white border border-gray-200 rounded text-left hover:border-gray-300 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 flex justify-between items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="text-sm md:text-base text-gray-800 font-medium">{text}</span>
    </button>
  );
};

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
  isLoading?: boolean;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelectQuestion, isLoading = false }) => {
  const questions = [
    "Was CIA really responsible for the assassination?",
    "Why were so many JFK witnesses dying mysteriously?",
    "Did the Mafia plan JFK's assassination?",
    "What did the government hide in the redacted files?",
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-6 max-w-4xl mx-auto px-2">
        {questions.map((question, index) => (
          <SuggestedQuestion 
            key={index} 
            text={question} 
            onClick={onSelectQuestion}
            isLoading={isLoading}
          />
        ))}
      </div>
    </>
  );
};

export default SuggestedQuestions; 