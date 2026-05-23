import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, FileText, ExternalLink } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const INITIAL_MESSAGE = {
  id: 1,
  sender: 'bot',
  isHtml: true,
  text: `Hi! I'm Soumyakant's AI Portfolio Assistant.<br/><br/>You can ask about:<br/>• Experience<br/>• Automation frameworks<br/>• Playwright & Selenium<br/>• CI/CD workflows<br/>• Skills<br/>• Resume<br/>• Contact details`
};

const PREDEFINED_PROMPTS = [
  "Tell me about his experience",
  "What automation frameworks has he built?",
  "What tools does he use?",
  "Explain his CI/CD experience",
  "What is he currently learning?",
  "Download resume",
  "View GitHub",
  "Connect on LinkedIn",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const nextIdRef = useRef(2);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Handle navigation commands
  const navigateToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // -- EXTERNAL LINKS / ACTIONS --
    if (lowerInput.includes('download resume') || lowerInput.includes('resume')) {
      window.open('/Soumyakant_Tripathy_SDET_Resume.pdf', '_blank');
      return "I'm opening Soumyakant's resume in a new tab for you!";
    }
    if (lowerInput.includes('github')) {
      window.open('https://github.com/soumyakant1211', '_blank');
      return "Taking you to his GitHub profile now!";
    }
    if (lowerInput.includes('linkedin')) {
      window.open('https://www.linkedin.com/in/soumyakant-tripathy/', '_blank');
      return "Opening his LinkedIn profile for you!";
    }

    // -- NAVIGATION COMMANDS --
    if (lowerInput.match(/show experience|navigate to experience|go to experience/)) {
      setTimeout(() => navigateToSection('experience'), 500);
      return "Navigating to the Experience section...";
    }
    if (lowerInput.match(/show skills|navigate to skills/)) {
      setTimeout(() => navigateToSection('skills'), 500);
      return "Navigating to the Skills section...";
    }
    if (lowerInput.match(/show contact|navigate to contact/)) {
      setTimeout(() => navigateToSection('contact'), 500);
      return "Navigating to the Contact section...";
    }
    if (lowerInput.match(/show recognition|navigate to recognition/)) {
      setTimeout(() => navigateToSection('recognitions'), 500);
      return "Navigating to the Recognitions section...";
    }

    // -- FAQ / KNOWLEDGE --
    if (lowerInput.includes('experience') || lowerInput.match(/work|years|history/)) {
      return `Soumyakant is a Senior Software Engineer (SDET) with 4 years of experience in QA automation and enterprise testing.

He has worked extensively on Selenium, Playwright, PyTest, API testing, and CI/CD automation in healthcare compliance workflows.

His work includes:
• reducing regression execution time by 40%
• improving build validation speed by 60%
• achieving ~95% API endpoint coverage
• integrating automated pipelines using Jenkins and CircleCI`;
    }

    if (lowerInput.match(/automation framework|frameworks built/)) {
      return `Soumyakant has worked on:
• Selenium automation frameworks
• Playwright-based UI automation
• PyTest automation suites
• Robot Framework implementations
• API testing frameworks using Postman and Requests

He also integrated automated execution into CI/CD pipelines using Jenkins, CircleCI, and GitHub Actions.`;
    }

    if (lowerInput.match(/tool|tools|skill|skills|stack/)) {
      return `His core tech stack includes: Python, JavaScript, Selenium, Playwright, PyTest, Docker, Postman, AWS S3, Jenkins, and GitHub Actions.

He specializes in modern scalable architecture and AI-assisted testing.`;
    }

    if (lowerInput.match(/ci\/cd|pipeline|jenkins/)) {
      return `He has strong CI/CD experience, seamlessly integrating test automation into Jenkins, CircleCI, and GitHub Actions to ensure continuous testing and immediate feedback on PRs.`;
    }

    if (lowerInput.match(/learning|currently learning/)) {
      return `Currently exploring:
• Agentic AI
• AI-assisted testing
• LangChain
• modern Playwright ecosystems
• scalable automation architecture`;
    }

    if (lowerInput.match(/(playwright|selenium)/)) {
      return "He is an expert in both! He builds scalable Page Object Model (POM) frameworks using Selenium for enterprise legacy systems, and modern blazing-fast UI automation using Playwright.";
    }

    if (lowerInput.match(/(hi|hello|hey)/)) {
      return "Hello! I am the AI Portfolio Assistant. How can I help you learn more about Soumyakant's engineering background today?";
    }

    return "I am strictly scoped to Soumyakant's portfolio! Please ask me about his experience, automation frameworks, skills, or for his resume.";
  };

  const handleSendText = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: nextIdRef.current++,
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getBotResponse(userMessage.text);
      const botResponse = {
        id: nextIdRef.current++,
        sender: 'bot',
        text: responseText
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    handleSendText(inputValue);
  };

  // Utility to render text safely if it contains newlines or HTML
  const renderMessageContent = (msg) => {
    if (msg.isHtml) {
      return <div dangerouslySetInnerHTML={{ __html: msg.text }} />;
    }
    // Handle plain text with newlines
    return msg.text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== msg.text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center
          ${isOpen 
            ? 'bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600 scale-90' 
            : 'bg-violet-600 hover:bg-violet-700 text-white hover:scale-110 shadow-violet-500/30'
          }`}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[380px] h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-8 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 dark:bg-slate-950 px-5 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shadow-inner shadow-violet-400/20">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-[15px] tracking-tight">AI Portfolio Assistant</h3>
                <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> SDET Context Loaded
                </p>
              </div>
            </div>
            
            {/* Quick Action Icons in Header */}
            <div className="flex gap-2">
               <a href="https://github.com/soumyakant1211" target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-md" aria-label="GitHub">
                 <GithubIcon />
               </a>
               <a href="https://www.linkedin.com/in/soumyakant-tripathy/" target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-md" aria-label="LinkedIn">
                 <LinkedinIcon />
               </a>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-slate-50/80 dark:bg-[#0f141d] custom-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center mt-1 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 dark:bg-slate-700 text-white' 
                    : 'bg-violet-600 text-white'
                }`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-[14px] leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 dark:bg-slate-800 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/50 rounded-tl-sm'
                }`}>
                  {renderMessageContent(msg)}
                </div>
              </div>
            ))}
            
            {/* Predefined Prompts */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-col gap-2 pt-2 pb-2">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 mb-1">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_PROMPTS.map((prompt, idx) => {
                    // Check if it's an action prompt (download, view) to add an icon
                    const isAction = prompt.match(/download|view|connect/i);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendText(prompt)}
                        className={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all text-left flex items-center gap-1.5 border shadow-sm
                          ${isAction 
                             ? 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700' 
                             : 'bg-white text-slate-700 border-slate-200 hover:border-violet-300 hover:bg-violet-50 dark:bg-slate-900/50 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:border-violet-500/50'
                          }`}
                      >
                        {isAction && <ExternalLink size={13} className="opacity-70" />}
                        {prompt}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 flex-row">
                 <div className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center mt-1 bg-violet-600 text-white shadow-sm">
                    <Bot size={14} />
                 </div>
                 <div className="px-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-tl-sm shadow-sm flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about my automation experience..."
              className="flex-1 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-500/50 border border-transparent focus:border-violet-500/30 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-violet-600 flex items-center justify-center text-white shrink-0 hover:bg-slate-800 dark:hover:bg-violet-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default Chatbot;
