import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { ChatWindow, type ChatMessage } from './components/ChatWindow';
import { TokenBar } from './components/TokenBar';
import { Sparkles, Download } from 'lucide-react';
import { UploadDropzone, UploadList, type Uploaded } from './components/UploadDropzone';
import { SummaryPanel } from './components/SummaryPanel';
import { Presets } from './components/Presets';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: 'Szia, miben segítsek?' },
  ]);
  const [typing, setTyping] = useState(false);
  const [files, setFiles] = useState<Uploaded[]>([]);

  const onSend = (text: string) => {
    const t = text.trim();
    if (!t) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: t };
    setMessages((m): ChatMessage[] => [...m, userMsg]);

    setTyping(true);
    setTimeout(() => {
      const botMsg: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: 'Demo válasz…' };
      setMessages((m): ChatMessage[] => [...m, botMsg]);
      setTyping(false);
    }, 600);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
  }, []);

  const handleDownloadPdf = () => window.print();
  const addFiles = (f: Uploaded[]) => setFiles(prev => [...prev, ...f]);
  const removeFile = (id: string) => setFiles(prev => prev.filter(x => x.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      {/* Animált háttér */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/25 to-cyan-500/25 blur-3xl bg-orb" />
      </div>

      <header className="no-print sticky top-0 z-20 border-b border-white/20 dark:border-white/10 backdrop-blur bg-white/60 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg"
            >
              <Sparkles size={18} />
            </motion.div>
            <div>
              <h1 className="font-semibold leading-5">AI UI Kit</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Chat • Upload • Summary</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDownloadPdf} className="px-3 py-1.5 rounded-md border text-sm inline-flex items-center gap-1">
              <Download size={14} /> PDF
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
        <TokenBar used={512} limit={8000} />
        <section className="grid lg:grid-cols-[1fr,22rem] gap-6">
          <ChatWindow messages={messages} onSend={onSend} typing={typing} />
          <aside className="hidden lg:block">
            <Presets onPick={(t) => onSend(t)} />
            <div className="h-4" />
            <UploadDropzone onFiles={addFiles} />
            <UploadList files={files} onRemove={removeFile} />
            <div className="h-4" />
            <SummaryPanel files={files} />
          </aside>
        </section>
      </main>
    </div>
  );
}
