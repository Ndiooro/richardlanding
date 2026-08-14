import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Send, Lock, ChevronRight } from "lucide-react";
import logoImage from "../../imports/logo.png";

const BRAND = "#28741A";
const BRAND_LIGHT = "#3d9e2b";

const chatTurns = [
  {
    q: "Qu'est ce que la comptabilité ?",
    a: "La comptabilité est un système d'organisation et d'analyse de l'information financière qui consiste à collecter, enregistrer, classer et synthétiser l'ensemble des opérations économiques d'une entité, afin de mesurer sa performance, de présenter une image fidèle de son patrimoine et de fournir des données fiables pour éclairer la prise de décision des dirigeants, des investisseurs et des autorités fiscales.",
  },
  {
    q: "Donne moi l'article 91 de l'AUDCIF",
    a: "L'article 91 de l'AUDCIF (OHADA) dispose que les produits et les charges sont obligatoirement classés par nature dans le compte de résultat consolidé, tout en précisant que ce dernier peut également être accompagné d'une seconde présentation des produits et des charges classés selon leur destination (ou par fonction), sur décision prise par l'entité consolidante.",
  },
  {
    q: " Quelle serait l'écriture pour une facture SENELEC de 120 000 F TTC ?",
    a: "Pour une facture SENELEC de 120 000 F TTC (soumise au taux de TVA normal de 18 %), l'écriture au système SYSCOHADA consiste à débiter le compte 6051 « Électricité » pour 101 695 F CFA HT et le compte 4452 « État, TVA récupérable sur achats » pour 18 305 F CFA, en contrepartie du crédit du compte 4011 « Fournisseurs » (ou le compte de trésorerie en cas de paiement immédiat) pour le montant total de 120 000 F CFA TTC.",
  },
  
];

export function HeroSection({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const [turnIdx, setTurnIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "answering" | "done">("typing");
  const [typedQ, setTypedQ] = useState("");
  const [typedA, setTypedA] = useState("");

  // 1. Référence et détection du scroll / visibilité à l'écran
  const chatRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chatRef, { amount: 0.3, once: false });

  const turn = chatTurns[turnIdx];

  useEffect(() => {
    setTypedQ("");
    setTypedA("");
    setPhase("typing");
  }, [turnIdx]);

  // 2. Bloquer l'animation de frappe de la question si pas visible
  useEffect(() => {
    if (!isInView || phase !== "typing") return;

    if (typedQ.length < turn.q.length) {
      const t = setTimeout(() => setTypedQ(turn.q.slice(0, typedQ.length + 1)), 36);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("answering"), 600);
    return () => clearTimeout(t);
  }, [isInView, phase, typedQ, turn]);

  // 3. Bloquer l'animation de la réponse si pas visible
  useEffect(() => {
    if (!isInView || phase !== "answering") return;

    if (typedA.length < turn.a.length) {
      const t = setTimeout(() => setTypedA(turn.a.slice(0, typedA.length + 2)), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setPhase("done");
      setTimeout(() => setTurnIdx(i => (i + 1) % chatTurns.length), 2200);
    }, 400);
    return () => clearTimeout(t);
  }, [isInView, phase, typedA, turn]);

  return (
    <section className="relative min-h-screen flex flex-col items-center px-6 pt-10 pb-16 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 55% at 50% 52%, rgba(40,116,26,0.14) 0%, transparent 70%)` }}
      />
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 w-full max-w-5xl flex items-center justify-between py-4 mb-10"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="absolute inset-0 blur-lg rounded-full" style={{ background: `${BRAND}50` }} />
            <img src={logoImage} alt="Richard AI" className="relative w-8 h-8 object-contain rounded-full" />
          </div>
          <span className="font-semibold text-white/90 text-sm tracking-tight">Richard AI</span>
        </div>

        <button
          onClick={onJoinWaitlist}
          className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden transition-all hover:scale-[1.03] group"
          style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})` }}
        >
          <span className="relative z-10">Rejoindre la liste VIP</span>
          <ChevronRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            style={{ background: `linear-gradient(135deg, ${BRAND_LIGHT}, #6db85f)` }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ boxShadow: `0 0 28px rgba(40,116,26,0.55)` }}
          />
        </button>
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center space-y-4 max-w-4xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05]">
            L'intelligence comptable
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${BRAND_LIGHT} 0%, #6db85f 50%, ${BRAND} 100%)` }}
            >
              au service de l'Afrique
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed">
            Le premier expert IA dédié au Droit OHADA, au CGI Sénégal et à la comptabilité SYSCOHADA.
            Des réponses précises, des écritures parfaites en quelques secondes.
          </p>
        </motion.div>

        {/* Chatbot preview widget — Rattaché à la ref 'chatRef' */}
        <motion.div
          ref={chatRef}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl"
        >
          {/* Glow behind card */}
          <div
            className="absolute -inset-8 rounded-[40px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse 80% 60% at 50% 60%, rgba(40,116,26,0.18) 0%, transparent 70%)` }}
          />

          {/* Main chat card */}
          <div
            className="relative rounded-[20px] border border-white/8 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
            style={{ background: "rgba(14,14,14,0.95)", backdropFilter: "blur(24px)" }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6">
              <div className="flex items-center gap-2.5">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 blur-md rounded-full" style={{ background: `${BRAND}60` }} />
                  <img src={logoImage} alt="" className="relative w-6 h-6 object-contain rounded-full" />
                </div>
                <span className="text-xs font-semibold text-white/80">Richard AI</span>
               <span
                className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full border font-medium"
                style={{ borderColor: `${BRAND}40`, background: `${BRAND}15`, color: BRAND_LIGHT }}
              >
                SYSCOHADA · OHADA · CGI
              </span>
              </div>
              <div className="flex gap-1.5">
                {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="px-5 py-5 space-y-4 min-h-[200px]">
              {/* User message */}
              <div className="flex justify-end">
                <div
                  className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm text-sm"
                  style={{ background: `${BRAND}22`, border: `1px solid ${BRAND}30`, color: "rgba(255,255,255,0.85)" }}
                >
                  {typedQ}
                  {phase === "typing" && (
                    <span
                      className="inline-block w-0.5 h-4 ml-0.5 animate-pulse align-middle"
                      style={{ background: BRAND_LIGHT }}
                    />
                  )}
                </div>
              </div>

              {/* AI response */}
              {(phase === "answering" || phase === "done") && typedA.length > 0 && (
                <div className="flex gap-3 items-start">
                  <div className="relative w-7 h-7 flex-shrink-0 mt-0.5">
                    <div className="absolute inset-0 blur-md rounded-full" style={{ background: `${BRAND}50` }} />
                    <img src={logoImage} alt="" className="relative w-7 h-7 object-contain rounded-full" />
                  </div>
                  <div
                    className="flex-1 px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed whitespace-pre-line"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)" }}
                  >
                    {typedA}
                    {phase === "answering" && (
                      <span
                        className="inline-block w-0.5 h-4 ml-0.5 animate-pulse align-middle"
                        style={{ background: BRAND_LIGHT }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="px-5 pb-4">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="flex-1 text-sm text-white/20">Posez votre question comptable ou juridique…</span>
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})` }}
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Turn dots */}
        <div className="flex gap-2">
          {chatTurns.map((_, i) => (
            <button
              key={i}
              onClick={() => setTurnIdx(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i === turnIdx ? BRAND_LIGHT : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}