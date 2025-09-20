const PRESETS = [
  { label: 'Összegzés', text: 'Foglaljad össze a következőt 5 pontban:' },
  { label: 'Kód review', text: 'Adj kód review megjegyzéseket, példákkal:' },
  { label: 'CSV → JSON', text: 'Alakítsd át a csatolt CSV-t valid JSON tömbbé:' },
  { label: 'Fordítás', text: 'Fordítsd le természetes magyarra:' },
];

export function Presets({ onPick }:{ onPick:(t:string)=>void }) {
  return (
    <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur p-4 shadow-sm">
      <h2 className="text-sm font-semibold mb-3">Presetek</h2>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p=>(
          <button key={p.label} onClick={()=>onPick(p.text)} className="text-xs rounded-md border px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800" title={p.text}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
