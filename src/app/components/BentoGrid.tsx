import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, FileSearch, Lock, Calculator, CheckCircle, ArrowRight } from "lucide-react";

const BRAND = "#28741A";
const BRAND_LIGHT = "#3d9e2b";

// Tile 1: Chat simulator prompts
const suggestedPrompts = [
  "Calcule la TVA déductible sur mes achats du mois",
  "Génère l'écriture pour un virement bancaire",
  "Quelle est la procédure OHADA pour une dissolution ?",
  "Quel taux d'amortissement pour un ordinateur ?",
];

// Tile 2: OCR scan animation lines
const docLines = [
  "FACTURE N° FA-2026-0412",
  "Émis le : 15 juin 2026",
  "Fournisseur : DIALLO & Fils",
  "Désignation : Fournitures de bureau",
  "Montant HT : 450 000 F CFA",
  "TVA 18% : 81 000 F CFA",
  "TOTAL TTC : 531 000 F CFA",
];

// Tile 4: TVA ring
function TvaRing({ pct }: { pct: number }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={BRAND_LIGHT}
        strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
      <text x="50" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">
        {pct}%
      </text>
    </svg>
  );
}

export function BentoGrid() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const [tvaFilled, setTvaFilled] = useState(false);

  // 1. Référence et détection du scroll pour la carte "Expert IA"
  const expertRef = useRef<HTMLDivElement>(null);
  const isExpertInView = useInView(expertRef, { amount: 0.3, once: false });

  // Référence globale pour déclencher l'animation TVA lorsque la section bas arrive à l'écran
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { amount: 0.2, once: false });

  // 2. Déclenchement de la rotation des suggestions uniquement si la carte est visible
  useEffect(() => {
    if (!isExpertInView) return;

    const i = setInterval(() => setPromptIdx(p => (p + 1) % suggestedPrompts.length), 2800);
    return () => clearInterval(i);
  }, [isExpertInView]);

  // 3. Déclenchement du scan OCR uniquement en visibilité
  useEffect(() => {
    if (!isGridInView) return;

    const i = setInterval(() => {
      setScanLine(l => {
        if (l >= docLines.length - 1) return 0;
        return l + 1;
      });
    }, 400);
    return () => clearInterval(i);
  }, [isGridInView]);

  // 4. Déclenchement du cercle TVA au scroll
  useEffect(() => {
    if (isGridInView) {
      const timer = setTimeout(() => setTvaFilled(true), 400);
      return () => clearTimeout(timer);
    } else {
      setTvaFilled(false);
    }
  }, [isGridInView]);

  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={gridRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: BRAND_LIGHT }}>
            Fonctionnalités
          </p>
          <h2 className="text-4xl md:text-5xl text-white mb-4">Conçu pour l'excellence</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Une technologie de pointe adaptée aux réalités comptables et juridiques de l'Afrique de l'Ouest.
          </p>
        </motion.div>

        {/* Bento grid — asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tile 1 — Large 2-col: Chat simulator (Expert IA Temps Réel) */}
          <motion.div
            ref={expertRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 rounded-[20px] border border-white/8 overflow-hidden group hover:border-white/14 transition-all"
            style={{ background: "rgba(14,14,14,0.8)", backdropFilter: "blur(12px)" }}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(40,116,26,0.2)" }}
                >
                  <Sparkles size={15} style={{ color: BRAND_LIGHT }} />
                </div>
                <h3 className="text-base font-semibold text-white/90">Expert IA temps réel</h3>
              </div>
              <p className="text-sm text-white/40 mb-6">
                Posez toutes vos questions en langage naturel. Richard répond avec la précision d'un expert-comptable senior.
              </p>

              {/* Simulated chat UI */}
              <div
                className="rounded-2xl border border-white/6 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${isExpertInView ? "animate-pulse" : ""}`}
                    style={{ background: BRAND_LIGHT }}
                  />
                  <span className="text-[10px] text-white/30">
                    {isExpertInView ? "Richard AI — En ligne" : "Richard AI — En attente"}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-end">
                    <div
                      className="px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm text-white/80 max-w-[85%]"
                      style={{ background: `${BRAND}20`, border: `1px solid ${BRAND}30` }}
                    >
                      Génère l'écriture pour une facture SONATEL de 59 000 F TTC
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: BRAND + "30" }}
                    >
                      <CheckCircle size={12} style={{ color: BRAND_LIGHT }} />
                    </div>
                    <div
                      className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-sm text-white/65 leading-relaxed"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      D 628 – Téléphone : 50 000 F<br />
                      D 4452 – TVA déductible : 9 000 F<br />
                      C 401 – SONATEL : 59 000 F ✓
                    </div>
                  </div>
                </div>

                {/* Rotating suggested prompts */}
                <div className="px-4 pb-4">
                  <p className="text-[10px] text-white/25 mb-2">Suggestions :</p>
                  <motion.button
                    key={promptIdx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl border border-white/8 text-white/45 hover:text-white/70 transition-colors"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <ArrowRight size={11} style={{ color: BRAND_LIGHT }} />
                    {suggestedPrompts[promptIdx]}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tile 2 — OCR extractor */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[20px] border border-white/8 overflow-hidden group hover:border-white/14 transition-all"
            style={{ background: "rgba(14,14,14,0.8)", backdropFilter: "blur(12px)" }}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(40,116,26,0.2)" }}
                >
                  <FileSearch size={15} style={{ color: BRAND_LIGHT }} />
                </div>
                <h3 className="text-sm font-semibold text-white/90">OCR & Extraction IA</h3>
              </div>
              <p className="text-xs text-white/35 mb-4">
                Importez vos factures PDF ou photos. Richard extrait et mappe automatiquement.
              </p>

              {/* Scanning document simulation */}
              <div
                className="flex-1 rounded-xl border border-white/6 overflow-hidden relative min-h-[140px]"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="p-3 space-y-1.5">
                  {docLines.map((line, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className={`flex-1 text-[9px] font-mono transition-all duration-300 ${
                          i <= scanLine ? "text-white/60" : "text-white/15"
                        }`}
                      >
                        {line}
                      </div>
                      {i <= scanLine && i === scanLine && isGridInView && (
                        <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: BRAND_LIGHT }} />
                      )}
                    </div>
                  ))}
                </div>
                {/* Scan line */}
                {isGridInView && (
                  <motion.div
                    className="absolute left-0 right-0 h-px opacity-60"
                    style={{
                      top: `${(scanLine / (docLines.length - 1)) * 100}%`,
                      background: `linear-gradient(90deg, transparent, ${BRAND_LIGHT}, transparent)`,
                      transition: "top 0.4s ease",
                    }}
                  />
                )}
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isGridInView ? "animate-pulse" : ""}`}
                  style={{ background: BRAND_LIGHT }}
                />
                <span className="text-[10px]" style={{ color: BRAND_LIGHT }}>
                  {isGridInView ? "Extraction en cours…" : "Prêt à scanner"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Tile 3 — Security */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[20px] border overflow-hidden group transition-all"
            style={{
              background: "rgba(40,116,26,0.06)",
              borderColor: "rgba(40,116,26,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "rgba(40,116,26,0.25)" }}
                >
                  <Lock size={15} style={{ color: BRAND_LIGHT }} />
                </div>
                <h3 className="text-sm font-semibold text-white/90 mb-2">Sécurité & Fiabilité</h3>
                <p className="text-xs text-white/35">Architecture RAG · Zéro hallucination · Sources tracées</p>
              </div>
              <div className="mt-4 space-y-2">
                {["RGPD Conforme", "Chiffrement E2E", "Données localisées EU"].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={11} style={{ color: BRAND_LIGHT }} />
                    <span className="text-xs text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

         {/* Tile 4 — TVA calculator */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="md:col-span-2 rounded-[20px] border border-white/8 overflow-hidden group hover:border-white/14 transition-all"
  style={{ background: "rgba(14,14,14,0.8)", backdropFilter: "blur(12px)" }}
>
  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
    <div className="flex-shrink-0">
      <TvaRing pct={tvaFilled ? 76 : 0} />
    </div>
    <div className="flex-1 w-full">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(40,116,26,0.2)" }}
        >
          <Calculator size={15} style={{ color: BRAND_LIGHT }} />
        </div>
        <h3 className="text-sm font-semibold text-white/90">Prévisionnel TVA & Fiscal</h3>
      </div>
      <p className="text-xs text-white/35 mb-4">
        Calcul automatique de votre TVA nette, anticipation des décaissements et alertes déclaratives.
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "TVA collectée", value: "847 320 F", hex: "rgba(255,255,255,0.7)" },
          { label: "TVA déductible", value: "203 400 F", hex: "#f59e0b" },
          { label: "TVA nette", value: "643 920 F", hex: BRAND_LIGHT },
        ].map(({ label, value, hex }) => (
          <div
            key={label}
            className="rounded-xl border border-white/6 p-2 sm:p-3 text-center"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <p className="text-[8px] sm:text-[9px] text-white/30 mb-1 truncate">{label}</p>
            {/* Taille ajustée pour le mobile ici */}
            <p className="text-[10px] sm:text-xs font-mono font-semibold whitespace-nowrap" style={{ color: hex }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
}