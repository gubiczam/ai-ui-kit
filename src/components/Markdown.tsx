import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlight, themes } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';

type CodeProps = React.ComponentPropsWithoutRef<'code'> & { inline?: boolean };

export function Markdown({ text }: { text: string }) {
  const dark = document.documentElement.classList.contains('dark');
  const theme = dark ? themes.nightOwl : themes.github;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ inline, className, children, ...props }: CodeProps) => {
          const match = /language-(\w+)/.exec(className || '');
          const raw = String(children ?? '').replace(/\n$/, '');

          // Inline code
          if (inline || !match) {
            return (
              <code
                {...props}
                className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900"
              >
                {raw}
              </code>
            );
          }

          // Biztonságos nyelv-tipus (no any)
          const language: Language = (match?.[1] as Language) ?? 'tsx';

          return (
            <div className="relative group">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(raw)}
                className="absolute right-2 top-2 z-10 text-xs rounded border px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition"
              >
                Másol
              </button>
              <Highlight code={raw} language={language} theme={theme}>
                {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${cls} overflow-auto rounded-md p-4`} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          );
        },
        a: (props) => (
          <a {...props} className="underline text-blue-600 dark:text-blue-400" />
        ),
        table: (props) => (
          <div className="overflow-x-auto">
            <table {...props} className="min-w-full" />
          </div>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
