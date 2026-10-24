import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  const WHATSAPP_RAW = '971549969994';
  const defaultText = encodeURIComponent("Hello Usman Global F.Z.C., I am interested in wholesale used clothing and export availability.");

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <span className="hidden sm:inline-block px-3 py-1.5 bg-slate-900/90 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with UAE Export Desk
      </span>
      <a
        href={`https://wa.me/${WHATSAPP_RAW}?text=${defaultText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp +971 54 996 9994"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <MessageSquare className="w-7 h-7 fill-white/20" />
      </a>
    </aside>
  );
}
