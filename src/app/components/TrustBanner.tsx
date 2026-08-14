import { motion } from "motion/react";
import { Shield, Lock, Award, Users, TrendingUp, Clock } from "lucide-react";

const BRAND_LIGHT = "#3d9e2b";

const stats = [
  { icon: Users,     value: "2 400+",  label: "Inscrits en liste VIP" },
  { icon: TrendingUp,value: "< 3 s",   label: "Temps de réponse moyen" },
  { icon: Clock,     value: "10 000+", label: "Écritures générées / mois" },
  { icon: Shield,    value: "100%",    label: "Sources officielles vérifiées" },
];

const badges = [
  { icon: Shield, label: "RGPD Conforme" },
  { icon: Lock,   label: "Chiffrement E2E" },
  { icon: Award,  label: "Architecture RAG" },
];

export function TrustBanner() {
  return (
    <section id="trust" className="relative py-20 px-6 overflow-hidden">
      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(40,116,26,0.3), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/6 hover:border-white/12 transition-all group"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110"
                style={{ background: "rgba(40,116,26,0.15)" }}>
                <Icon size={18} style={{ color: BRAND_LIGHT }} />
              </div>
              <p className="text-2xl font-semibold text-white mb-1">{value}</p>
              <p className="text-xs text-white/40 leading-relaxed">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Security badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <Icon size={13} style={{ color: BRAND_LIGHT }} />
              <span className="text-xs text-white/50">{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{ borderColor: "rgba(40,116,26,0.3)", background: "rgba(40,116,26,0.08)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BRAND_LIGHT }} />
            <span className="text-xs" style={{ color: BRAND_LIGHT }}>Droit OHADA · CGI Sénégal · SYSCOHADA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
