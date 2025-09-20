import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { UploadCloud, FileText, X } from 'lucide-react';

export type Uploaded = { id:string; name:string; size:number; type:string; content?:string };

export function UploadDropzone({ onFiles }:{ onFiles:(files:Uploaded[])=>void }) {
  const onDrop = useCallback(async (accepted: File[]) => {
    const mapped: Uploaded[] = [];
    for (const f of accepted) {
      let content: string|undefined;
      if (f.size < 200_000 && f.type.startsWith('text/')) {
        content = await f.text();
      }
      mapped.push({ id: crypto.randomUUID(), name: f.name, size: f.size, type: f.type, content });
    }
    onFiles(mapped);
    toast.success(`${accepted.length} fájl hozzáadva`);
  }, [onFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-2xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/50 backdrop-blur p-4 text-sm cursor-pointer transition
        ${isDragActive ? 'ring-2 ring-fuchsia-500/50' : ''}`}
      title="Húzd ide a fájlokat vagy kattints"
    >
      <input {...getInputProps()} />
      <div className="flex items-center gap-2">
        <UploadCloud size={16} />
        <div>
          <div className="font-medium">Fájlok feltöltése</div>
          <div className="text-slate-600 dark:text-slate-400">Húzd ide vagy kattints. Kis szövegfájlokat be is olvasunk a demo-hoz.</div>
        </div>
      </div>
    </div>
  );
}

export function UploadList({ files, onRemove }:{ files:Uploaded[]; onRemove:(id:string)=>void }) {
  if (!files.length) return null;
  return (
    <div className="mt-3 space-y-2">
      {files.map(f=>(
        <div key={f.id} className="flex items-start justify-between rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-3">
          <div className="flex items-start gap-2">
            <FileText size={16} className="mt-0.5" />
            <div>
              <div className="text-sm font-medium">{f.name}</div>
              <div className="text-xs text-slate-500">{(f.size/1024).toFixed(1)} KB • {f.type||'ismeretlen'}</div>
              {f.content && (
                <pre className="mt-2 max-h-24 overflow-auto text-xs rounded bg-slate-100 dark:bg-slate-950/60 p-2">{f.content.slice(0,1000)}</pre>
              )}
            </div>
          </div>
          <button onClick={()=>onRemove(f.id)} className="p-1 rounded border hover:bg-slate-50 dark:hover:bg-slate-800" title="Eltávolítás">
            <X size={14}/>
          </button>
        </div>
      ))}
    </div>
  );
}
