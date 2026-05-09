"use client";

import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer 
      className="border-t border-white/[0.04] py-6 px-4 mt-auto"
      style={{ paddingBottom: "max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))" }}
    >
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-sm text-white/40">BeautyBody</p>
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <MapPin className="w-3 h-3 shrink-0" />
            <span>Lloret de Mar / Barcelona</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/25">
            <a 
              href="mailto:beautybodyes@gmail.com" 
              className="flex items-center gap-1 hover:text-white/50 transition-colors min-h-[44px]"
            >
              <Mail className="w-3 h-3" />
              beautybodyes@gmail.com
            </a>
            <a 
              href="tel:+34603847323" 
              className="flex items-center gap-1 hover:text-white/50 transition-colors min-h-[44px]"
            >
              <Phone className="w-3 h-3" />
              +34 603 847 323
            </a>
          </div>
          <p className="text-white/20 text-[10px] mt-2 max-w-xs leading-relaxed">
            This is a visual surface assessment simulation, not a medical diagnosis. 
            For medical concerns, please consult a dermatologist.
          </p>
        </div>
      </div>
    </footer>
  );
}
