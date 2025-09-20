import type { ChatMessage } from './ChatWindow';

export type Conv = { id:string; title:string; preview:string; date:number; messages:ChatMessage[] };

export function History({ items, onOpen }:{ items:Conv[]; onOpen:(id:string)=>void }) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur p-4 shadow-sm">
      <h2 className="text-sm font-semibold mb-3">Előzmények</h2>
      <ul className="space-y-2 text-sm">
        {items.map(c=>(
          <li key={c.id}>
            <button onClick={()=>onOpen(c.id)} className="w-full text-left rounded-md border px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className="font-medium truncate">{c.title}</div>
              <div className="text-xs text-slate-500 truncate">{c.preview}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
