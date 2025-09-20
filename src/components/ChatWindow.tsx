import { useRef, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { Copy, Check, User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export function ChatWindow({
  messages,
  onSend,
  typing = false,
}: {
  messages: ChatMessage[];
  onSend: (t: string) => void;
  typing?: boolean;
}) {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const t = text.trim();
      if (t) {
        onSend(t);
        setText('');
      }
    }
  };

  return (
    <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur shadow-sm overflow-hidden">
      <div className="h-[62vh] overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role} content={m.content} />
        ))}
        {typing && <TypingBubble />}
        <div ref={endRef} />
      </div>
      <div className="p-3 border-t border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/60">
        <div className="flex gap-2">
          <TextareaAutosize
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            minRows={2}
            maxRows={8}
            placeholder="Írj promptot…"
            className="flex-1 rounded-xl border bg-white/90 dark:bg-slate-950/60 px-3 py-2 outline-none"
          />
          <button
            onClick={() => {
              const t = text.trim();
              if (t) {
                onSend(t);
                setText('');
              }
            }}
            className="px-4 py-2 rounded-xl border bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
          >
            Küld
          </button>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  role,
  content,
}: {
  role: 'user' | 'assistant' | 'system';
  content: string;
}) {
  const isUser = role === 'user';

  return (
    <div className={twMerge('group flex gap-3', isUser && 'justify-end')}>
      {!isUser && <Avatar icon="bot" />}
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18 }}
        className={clsx(
          'relative max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-sm',
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white ml-auto'
            : 'bg-white/80 dark:bg-slate-950/40 border border-white/40 dark:border-white/10 backdrop-blur'
        )}
      >
        <div className="leading-6 whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
          <Markdown>{content}</Markdown>
        </div>
        <MsgToolbar text={content} isUser={isUser} />
      </motion.div>
      {isUser && <Avatar icon="user" />}
    </div>
  );
}

function Avatar({ icon }: { icon: 'user' | 'bot' }) {
  const Icon = icon === 'user' ? User : Bot;
  return (
    <div className="mt-0.5 h-8 w-8 rounded-xl grid place-items-center border bg-white/70 dark:bg-slate-950/40 border-white/40 dark:border-white/10 shadow-sm">
      <Icon size={16} />
    </div>
  );
}

function MsgToolbar({ text, isUser }: { text: string; isUser: boolean }) {
  const [copied, setCopied] = useState(false);
  const Icon = copied ? Check : Copy;
  return (
    <div
      className={clsx(
        'absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity',
        isUser ? 'right-2' : 'left-2'
      )}
    >
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="text-[10px] inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 bg-white/70 dark:bg-slate-900/70"
        title="Másolás"
      >
        <Icon size={12} /> {copied ? 'Másolva' : 'Másol'}
      </button>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-3">
      <Avatar icon="bot" />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-sm bg-white/80 dark:bg-slate-950/40 border border-white/40 dark:border-white/10 backdrop-blur"
      >
        <div className="flex gap-1">
          <Dot />
          <Dot delay={0.12} />
          <Dot delay={0.24} />
        </div>
      </motion.div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="h-2 w-2 rounded-full bg-slate-500 dark:bg-slate-400 inline-block"
      animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}
