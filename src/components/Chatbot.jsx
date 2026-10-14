import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PROFILE } from '../data/profile';
import { WELCOME_MESSAGE, SUGGESTED_PROMPTS, getBotReply } from '../lib/chatbot';

const TYPING_DELAY_MS = 600;
const SCROLL_DELAY_MS = 500;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, sender: 'bot', text: WELCOME_MESSAGE }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);
  const nextIdRef = useRef(2);
  const timersRef = useRef(new Set());

  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, ms);
    timersRef.current.add(id);
  };

  // Drop pending replies if the widget unmounts mid-"typing"
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    // Skip auto-focus on touch screens so the keyboard doesn't cover the suggested prompts
    if (window.matchMedia?.('(pointer: fine)').matches) inputRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
  };

  const handleSendText = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const { text: replyText, action } = getBotReply(trimmed);

    // Open new tabs synchronously, while the click/submit still counts as a user
    // gesture — browsers may block window.open once the typing delay has passed.
    if (action?.type === 'open') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }

    setMessages((prev) => [...prev, { id: nextIdRef.current++, sender: 'user', text: trimmed }]);
    setInputValue('');
    setIsTyping(true);

    later(() => {
      setMessages((prev) => [...prev, { id: nextIdRef.current++, sender: 'bot', text: replyText }]);
      setIsTyping(false);
      if (action?.type === 'scroll') {
        later(() => scrollToSection(action.id), SCROLL_DELAY_MS);
      }
    }, TYPING_DELAY_MS);
  };

  const handleSend = (e) => {
    e.preventDefault();
    handleSendText(inputValue);
  };

  return (
    <>
      <button
        ref={toggleRef}
        onClick={() => setIsOpen((open) => !open)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center
          ${isOpen
            ? 'bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600 scale-90'
            : 'bg-violet-600 hover:bg-violet-700 text-white hover:scale-110 shadow-violet-500/30'
          }`}
        aria-label="Toggle Chatbot"
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <section
          id="chatbot-panel"
          aria-label="AI Portfolio Assistant chat"
          className="fixed bottom-22 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] max-w-[380px] h-[min(500px,calc(100dvh-8rem))] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-pop-in"
        >
          {/* Header */}
          <div className="bg-slate-900 dark:bg-slate-950 px-5 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shadow-inner shadow-violet-400/20">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-[15px] tracking-tight">AI Portfolio Assistant</h3>
                <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span> SDET Context Loaded
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-md" aria-label="GitHub">
                <GithubIcon size={16} />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-md" aria-label="LinkedIn">
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Messages Area */}
          <div
            role="log"
            aria-live="polite"
            className="flex-1 p-4 overflow-y-auto overscroll-contain space-y-5 bg-slate-50/80 dark:bg-[#0f141d] custom-scrollbar"
          >
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
                <p className={`px-4 py-3 rounded-2xl max-w-[80%] text-[14px] leading-relaxed shadow-sm whitespace-pre-line break-words ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 dark:bg-slate-800 text-white rounded-tr-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/50 rounded-tl-sm'
                }`}>
                  {msg.text}
                </p>
              </div>
            ))}

            {/* Suggested prompts, shown until the visitor sends something */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-col gap-2 pt-2 pb-2">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 mb-1">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => {
                    const isAction = /download|view|connect/i.test(prompt);
                    return (
                      <button
                        key={prompt}
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
                    );
                  })}
                </div>
              </div>
            )}

            {isTyping && (
              <div className="flex gap-3 flex-row" aria-label="Assistant is typing">
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
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about my automation experience..."
              aria-label="Message the portfolio assistant"
              maxLength={300}
              className="flex-1 min-w-0 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-xl text-base sm:text-sm outline-none focus:ring-2 focus:ring-violet-500/50 border border-transparent focus:border-violet-500/30 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-violet-600 flex items-center justify-center text-white shrink-0 hover:bg-slate-800 dark:hover:bg-violet-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Chatbot;
