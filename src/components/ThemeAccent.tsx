import * as React from 'react';
import { Command } from 'cmdk';

export type CmdAction = { id:string; label:string; run:()=>void };

export function CommandPalette({ actions }:{ actions:CmdAction[] }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    const onKey = (e:KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==='k') { e.preventDefault(); setOpen(v=>!v); }
    };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  },[]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={()=>setOpen(false)}>
      <div className="mx-auto max-w-lg mt-24" onClick={e=>e.stopPropagation()}>
        <Command label="Parancsok" className="w-full rounded-2xl border bg-white dark:bg-slate-900 text-sm overflow-hidden">
          <Command.Input placeholder="Keresés…" className="px-3 py-2 border-b outline-none bg-transparent" />
          <Command.List className="max-h-80 overflow-auto">
            {actions.map(a=>(
              <Command.Item key={a.id} onSelect={()=>{ a.run(); setOpen(false); }} className="px-3 py-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                {a.label}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
