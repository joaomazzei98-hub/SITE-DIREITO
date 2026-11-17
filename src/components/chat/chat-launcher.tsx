"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { AssistantIcon } from "./chat-icons";

const ChatDialog = dynamic(() => import("./chat-dialog"), {
  ssr: false,
  loading: () => (
    <p role="status" className="sr-only">
      Abrindo assistente…
    </p>
  )
});

export function ChatLauncher() {
  const pathname = usePathname();
  const launcher = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;
  return (
    <>
      <button
        type="button"
        ref={launcher}
        aria-label="Assistente virtual"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="group fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-petrol text-white shadow-[0_6px_24px_rgba(16,36,45,0.2)] transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petrol motion-safe:hover:-translate-y-0.5 sm:bottom-6 sm:left-6 lg:left-auto lg:right-6"
      >
        <AssistantIcon className="h-7 w-7" />
        <span className="pointer-events-none absolute bottom-full left-0 mb-3 whitespace-nowrap rounded-lg border border-petrol/10 bg-white px-3 py-2 text-xs font-medium text-petrol opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:left-auto lg:right-0">
          Assistente virtual
        </span>
      </button>
      {open && (
        <ChatDialog
          onClose={() => {
            setOpen(false);
            launcher.current?.focus();
          }}
        />
      )}
    </>
  );
}
