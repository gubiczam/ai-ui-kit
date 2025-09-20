import { useEffect, useState } from 'react';
import type { Uploaded } from './UploadDropzone';
import { Sparkles } from 'lucide-react';

export function SummaryPanel({ files }:{ files:Uploaded[] }) {
  const [summary, setSummary] = useState<string>('Nincs még összegzés.');

  useEffect(()=>{
    if (!files.length) { setSummary('Adj hozzá fájlokat az összegzéshez.'); return; }
    const texts = files.map(f => (f.content || f.name)).join('\n\n');
    const snippet = texts.slice(0, 400);
    setSummary(`Összegzés (demo):\n— Fájlok száma: ${files.length}\n— Minta tartalom:\n${snippet}${texts.length>400 ? '…' : ''}`);
  }, [files]);

  return (
    <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 grid place-items-center rounded-lg bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">
          <Sparkles size={16} />
        </div>
        <h2 className="text-sm font-semibold">AI Summary</h2>
      </div>
      <pre className="whitespace-pre-wrap text-sm leading-6">{summary}</pre>
    </div>
  );
}
