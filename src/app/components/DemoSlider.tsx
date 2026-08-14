import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Building2, UserCheck, ChevronRight } from "lucide-react";

const BRAND = "#28741A";
const BRAND_LIGHT = "#3d9e2b";

const tabs = [
  {
    id: "freelance",
    label: "Freelances",
    icon: UserCheck,
    headline: "Votre comptabilité, sans expert-comptable",
    sub: "Gérez vos factures, TVA et déclarations OHADA en toute autonomie.",
    qa: [
      {
        q: "Je viens de vendre une prestation de 500 000 F TTC. Quelle écriture ?",
        a: "D 411 – Client : 500 000 F\nC 4431 – TVA collectée : 76 271 F\nC 706 – Prestations : 423 729 F\nÉcriture équilibrée ✓",
      },
      {
        q: "Mon client n'a pas encore payé depuis 60 jours. Quels sont mes recours OHADA ?",
        a: "Selon l'Acte Uniforme OHADA sur les sûretés, vous pouvez envoyer une mise en demeure. Passé 90 jours, l'injonction de payer (procédure simplifiée) est disponible auprès du tribunal. Je peux rédiger le courrier.",
      },
    ],
  },
  {
    id: "pme",
    label: "PME",
    icon: Building2,
    headline: "Piloter votre PME avec une clarté absolue",
    sub: "Journalisation automatisée, tableaux de bord TVA, conformité SYSCOHADA au quotidien.",
    qa: [
      {
        q: "Génère les écritures de paie pour un salaire brut de 800 000 F",
        a: "D 661 – Salaires : 800 000 F\nD 663 – Charges patronales (8.4%) : 67 200 F\nC 4421 – IPRES salarié (5.6%) : 44 800 F\nC 4421 – IPRES patronal (8.4%) : 67 200 F\nC 521 – Banque net : 755 200 F",
      },
      {
        q: "Quel est le taux d'amortissement d'un véhicule utilitaire au Sénégal ?",
        a: "Les véhicules utilitaires sont amortis sur 5 ans en linéaire selon le CGI Sénégal, soit 20% par an (compte 612). Pour un véhicule de 15 000 000 F : 3 000 000 F par an.",
      },
    ],
  },
  {
    id: "cabinet",
    label: "Experts-Comptables",
    icon: Briefcase,
    headline: "Votre assistant senior disponible 24h/24",
    sub: "Vérification des écritures, recherche juridique OHADA instantanée, génération de liasses.",
    qa: [
      {
        q: "Vérifie l'équilibre de cette écriture et identifie les anomalies SYSCOHADA.",
        a: "Analyse en cours… ✓ L'écriture est équilibrée (Débit = Crédit = 1 240 000 F). Anomalie détectée : compte 6019 non prévu au SYSCOHADA révisé 2017. Substitution recommandée : compte 601 ou 604 selon la nature.",
      },
      {
        q: "Quelles sont les nouvelles dispositions OHADA sur la transformation de SARL en SA ?",
        a: "La transformation SARL → SA requiert un capital minimum de 10 000 000 F CFA (OHADA, art. 386). Elle nécessite un rapport du commissaire aux comptes certifiant la valeur des biens. J'ai la procédure complète et les actes types disponibles.",
      },
    ],
  },
];

export function DemoSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [qaIdx, setQaIdx] = useState(0);
  const tab = tabs[activeTab];
  const qa = tab.qa[qaIdx % tab.qa.length];

  return (
    <section id="how" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: BRAND_LIGHT }}>Comment ça marche</p>
          <h2 className="text-4xl md:text-5xl text-white mb-4">Fait pour chaque profil</h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Richard s'adapte à votre métier et votre niveau d'expertise comptable.
          </p>
        </motion.div>

        {/* Tab selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map(({ id, label, icon: Icon }, i) => (
            <button
              key={id}
              onClick={() => { setActiveTab(i); setQaIdx(0); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-200 border"
              style={activeTab === i ? {
                background: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})`,
                borderColor: "transparent",
                color: "white",
                boxShadow: `0 0 20px rgba(40,116,26,0.35)`,
              } : {
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-[20px] border border-white/8 overflow-hidden"
              style={{ background: "rgba(14,14,14,0.85)", backdropFilter: "blur(16px)" }}>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-b border-white/6 gap-3">
                <div>
                  <h3 className="font-semibold text-white/90 mb-1">{tab.headline}</h3>
                  <p className="text-sm text-white/40">{tab.sub}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BRAND_LIGHT }} />
                  <span className="text-xs text-white/30">Simulation live</span>
                </div>
              </div>

              {/* Q&A display */}
              <div className="p-6 space-y-4 min-h-[220px]">
                <div className="flex justify-end">
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm text-sm text-white/80 leading-relaxed"
                    style={{ background: `${BRAND}20`, border: `1px solid ${BRAND}30` }}>
                    {qa.q}
                  </div>
                </div>
                <motion.div
                  key={`${activeTab}-${qaIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${BRAND}25` }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: BRAND_LIGHT }} />
                  </div>
                  <div className="flex-1 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-white/65 leading-relaxed whitespace-pre-line"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {qa.a}
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/6">
                <div className="flex gap-1.5">
                  {tab.qa.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setQaIdx(i)}
                      className="w-5 h-1 rounded-full transition-all"
                      style={{ background: i === qaIdx % tab.qa.length ? BRAND_LIGHT : "rgba(255,255,255,0.15)" }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setQaIdx(i => i + 1)}
                  className="flex items-center gap-1.5 text-xs transition-all hover:gap-2"
                  style={{ color: BRAND_LIGHT }}
                >
                  Exemple suivant <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
