export function TokenBar({ used, limit }:{ used:number; limit:number }) {
  const pct = Math.min(100, Math.round((used/limit)*100));
  return (
    <div className="no-print rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur p-4 shadow-sm">
      <div className="flex justify-between text-xs mb-2">
        <span className="font-medium">Token használat</span>
        <span className="text-slate-600 dark:text-slate-400">{used}/{limit} • {pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200/70 dark:bg-slate-700/40 overflow-hidden">
        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
