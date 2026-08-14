import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logoImage from "../../imports/WhatsApp_Image_2026-05-07_at_16.53.48.WhatsApp_Image_2026-05-07_at_16.53.48.png";

const links = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how" },
  { label: "Sécurité", href: "#trust" },
];

export function FloatingNav({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
      >
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "bg-[#0a0a0a]/90 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "bg-white/4 border-white/8"
          }`}
          style={{ backdropFilter: "blur(16px)" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 bg-[#28741A]/40 blur-lg rounded-full" />
              <img src={logoImage} alt="Richard AI" className="relative w-8 h-8 object-contain rounded-full" />
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">Richard AI</span>
          </div>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-1.5 rounded-xl text-sm text-white/50 hover:text-white/90 hover:bg-white/6 transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onJoinWaitlist}
              className="relative hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white overflow-hidden transition-all duration-200 hover:scale-[1.03] group"
              style={{ background: "linear-gradient(135deg, #28741A, #3d9e2b)" }}
            >
              <span className="relative z-10">Rejoindre la liste VIP</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(135deg, #3d9e2b, #6db85f)" }} />
              <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(40,116,26,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/8 transition-all"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mt-2 rounded-2xl border border-white/10 overflow-hidden"
              style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)" }}
            >
              {links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-5 py-4 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all border-b border-white/6 last:border-0"
                >
                  {label}
                </a>
              ))}
              <div className="p-4">
                <button
                  onClick={() => { setMobileOpen(false); onJoinWaitlist(); }}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #28741A, #3d9e2b)" }}
                >
                  Rejoindre la liste VIP
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
