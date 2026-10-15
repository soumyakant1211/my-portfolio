import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useMode } from '../context/mode';
import { BOOT_LINES, runCommand } from '../lib/terminal';

const PROMPT = 'player@portfolio:~$';

/** Hidden "New Game+" terminal, unlocked with the Konami code or the footer hint. */
const NewGamePlus = ({ onClose }) => {
  const { setMode } = useMode();
  const [lines, setLines] = useState(() => BOOT_LINES.map((text, id) => ({ id, text })));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const nextIdRef = useRef(BOOT_LINES.length);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Focus the prompt on open and give focus back to the page on close
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    inputRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const print = (texts) =>
    setLines((prev) => [...prev, ...texts.map((text) => ({ id: nextIdRef.current++, text }))]);

  const perform = (action) => {
    if (!action) return;
    switch (action.type) {
      case 'open':
        window.open(action.url, '_blank', 'noopener,noreferrer');
        break;
      case 'scroll':
        onClose();
        setTimeout(() => document.getElementById(action.id)?.scrollIntoView({ behavior: 'smooth' }), 50);
        break;
      case 'mode':
        setMode(action.mode);
        break;
      case 'clear':
        setLines([]);
        break;
      case 'close':
        onClose();
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const command = input;
    const result = runCommand(command);
    print([`${PROMPT} ${command}`, ...(result.action?.type === 'clear' ? [] : result.lines)]);
    if (command.trim()) setHistory((prev) => [command, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    setInput('');
    perform(result.action);
  };

  // ↑ / ↓ walk through previous commands, like a real shell
  const handleKeyDown = (e) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    const next = e.key === 'ArrowUp' ? Math.min(historyIndex + 1, history.length - 1) : Math.max(historyIndex - 1, -1);
    setHistoryIndex(next);
    setInput(next === -1 ? '' : history[next]);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="New Game+ terminal"
        className="w-full max-w-2xl h-[min(540px,85dvh)] flex flex-col rounded-md border border-cyan-400/40 bg-[#05070d] shadow-[0_0_60px_-10px] shadow-cyan-400/40 font-mono text-sm text-[#a9b6c9]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-cyan-400/20 bg-[#0a101c]">
          <p className="text-xs tracking-[0.25em] uppercase">
            <span className="text-pink-400 font-bold">New Game+</span>
            <span className="text-[#7f8ca1]"> — {PROMPT.replace('$', '')}</span>
          </p>
          <button type="button" onClick={onClose} aria-label="Close terminal" className="p-1 text-[#7f8ca1] hover:text-cyan-300 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div role="log" aria-live="polite" className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5 custom-scrollbar">
          {lines.map((line) => (
            <p
              key={line.id}
              className={`whitespace-pre-wrap break-words ${line.text.startsWith(PROMPT) ? 'text-cyan-300' : line.text.startsWith('>') ? 'text-pink-400' : ''}`}
            >
              {line.text || ' '}
            </p>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-cyan-400/20">
          <span className="text-cyan-300 shrink-0" aria-hidden="true">{PROMPT}</span>
          <input
            ref={inputRef}
            aria-label="Terminal command"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent text-[#e6f6ff] outline-none caret-cyan-300 text-base sm:text-sm"
          />
        </form>
      </div>
    </div>
  );
};

export default NewGamePlus;
