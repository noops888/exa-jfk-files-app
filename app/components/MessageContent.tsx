// Helper function to render markdown-like content
import React from 'react';

const MessageContent = ({ content }: { content: string }) => {
  // Process the content to handle markdown-like syntax
  const processContent = (text: string) => {
    // Process the text in a specific order to avoid conflicts

    // Replace heading levels
    text = text.replace(/^# (.*?)$/gm, '<span class="text-2xl font-bold">$1</span>');
    text = text.replace(/^## (.*?)$/gm, '<span class="text-xl font-bold">$1</span>');
    text = text.replace(/^### (.*?)$/gm, '<span class="text-lg font-bold">$1</span>');
    
    // Replace bold text (**bold**)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    
    // Replace italic text (*italic*)
    text = text.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    
    // Handle bullet points
    // First, identify bullet point lists and wrap them in <ul> tags
    let bulletListPattern = /^(\s*[-*]\s+.*(?:\n\s*[-*]\s+.*)*)/gm;
    text = text.replace(bulletListPattern, '<ul class="list-disc pl-5 space-y-1 my-2">$1</ul>');
    
    // Then convert each bullet point line to <li> elements
    text = text.replace(/^\s*[-*]\s+(.*?)$/gm, '<li>$1</li>');
    
    // Handle numbered lists
    // First, identify numbered lists and wrap them in <ol> tags
    let numberedListPattern = /^(\s*\d+\.\s+.*(?:\n\s*\d+\.\s+.*)*)/gm;
    text = text.replace(numberedListPattern, '<ol class="list-decimal pl-5 space-y-1 my-2">$1</ol>');
    
    // Then convert each numbered point to <li> elements
    text = text.replace(/^\s*\d+\.\s+(.*?)$/gm, '<li>$1</li>');
    
    // Replace URLs with links - adding word-break and overflow-wrap to handle long URLs
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[var(--brand-default)] hover:text-[var(--brand-muted)] underline break-words overflow-wrap-anywhere">$1</a>'
    );

    // Replace line breaks (after all list processing is done)
    text = text.replace(/\n/g, '<br />');
    
    return text;
  };

  // Create markup object from processed content
  const createMarkup = () => {
    return { __html: processContent(content) };
  };

  // Render the processed content
  return <div className="markdown-content break-words overflow-hidden" dangerouslySetInnerHTML={createMarkup()} />;
};

export default MessageContent; 