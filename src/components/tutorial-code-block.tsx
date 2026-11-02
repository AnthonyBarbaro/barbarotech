"use client";

import { useState } from "react";

type Props = { label: string; language: string; code: string };

export function TutorialCodeBlock({ label, language, code }: Props): React.JSX.Element {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="tutorial-code-block">
      <div className="tutorial-code-heading">
        <span>{label}</span>
        <button type="button" onClick={copyCode} aria-label={`Copy ${label}`}>
          {status === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${label} code`}><code data-language={language}>{code}</code></pre>
      <p role="status" className={status === "error" ? "tutorial-copy-error" : "sr-only"}>
        {status === "error" ? "Clipboard unavailable. Select the code above and copy it manually." : status === "copied" ? "Copied to clipboard." : ""}
      </p>
    </div>
  );
}
