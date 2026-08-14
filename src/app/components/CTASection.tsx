import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import logoImage from "../../imports/logo.png";

const BRAND = "#28741A";
const BRAND_LIGHT = "#3d9e2b";

// ⚠️ Configuration à remplacer avec vos identifiants
const CONFIG = {
  SHEETDB_URL: "https://sheetdb.io/api/v1/dj95xmirnw42g", // Remplacez par votre URL SheetDB
  EMAILJS_SERVICE_ID: "service_xirff68",                     // Remplacez par votre Service ID EmailJS
  EMAILJS_TEMPLATE_ID: "YOUR_TEMPLATE_ID",                   // Remplacez par votre Template ID EmailJS
  EMAILJS_PUBLIC_KEY: "YOUR_PUBLIC_KEY",                     // Remplacez par votre Public Key EmailJS
};

type FormState = "idle" | "loading" | "success" | "error";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValidEmail) {
      setState("error");
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      // 1. Enregistrement dans Google Sheets via SheetDB.io
      const sheetPromise = fetch(CONFIG.SHEETDB_URL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              email: email.trim(),
              created_at: new Date().toISOString(),
            },
          ],
        }),
      });

      // 2. Envoi du mail via votre route API locale (Nodemailer)
      const emailPromise = fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      // Exécution parallèle des deux requêtes
      const [sheetRes, emailRes] = await Promise.all([sheetPromise, emailPromise]);

      if (!sheetRes.ok) {
        throw new Error("Erreur lors de l'enregistrement dans la base de données.");
      }

      if (!emailRes.ok) {
        console.warn("L'email de confirmation n'a pas pu être envoyé, mais l'inscription est validée.");
      }

      setState("success");
    } catch (err: any) {
      console.error("Erreur inscription waitlist:", err);
      setState("error");
      setErrorMessage(err?.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <>
      {/* CTA Section */}
      <section id="waitlist" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[32px] overflow-hidden border"
            style={{ borderColor: "rgba(40,116,26,0.25)" }}
          >
            {/* Multi-layer background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(40,116,26,0.12) 0%, rgba(10,10,10,0.95) 60%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(40,116,26,0.15) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(40,116,26,0.5), transparent)",
              }}
            />

            <div className="relative z-10 px-8 sm:px-14 py-14 sm:py-16">
              <AnimatePresence mode="wait">
                {state !== "success" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Badge */}
                      <div
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full border mb-7"
                        style={{
                          borderColor: `${BRAND}40`,
                          background: `${BRAND}12`,
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: BRAND_LIGHT }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: BRAND_LIGHT }}
                        >
                          Accès Bêta · Places limitées
                        </span>
                      </div>

                      <h2 className="text-3xl sm:text-5xl text-white mb-4 tracking-tight leading-tight">
                        Soyez les premiers à tester<br />
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${BRAND_LIGHT}, #6db85f)`,
                          }}
                        >
                          l'intelligence comptable
                        </span>
                      </h2>
                      <p className="text-white/45 mb-10 max-w-xl leading-relaxed">
                        Rejoignez la liste d'attente exclusive. Accès
                        prioritaire à la Bêta, tarif de lancement préférentiel
                        et accompagnement personnalisé.
                      </p>

                      {/* Formulaire Email */}
                    {/* Formulaire Email Responsive */}
<form
  onSubmit={handleSubmit}
  className="w-full max-w-md flex flex-col gap-2"
>
  <div
    className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 p-1.5 sm:p-2 rounded-2xl border transition-all duration-200"
    style={{
      background: "rgba(255,255,255,0.05)",
      borderColor:
        state === "error"
          ? "#ef4444"
          : focused
          ? `${BRAND}60`
          : "rgba(255,255,255,0.1)",
      boxShadow:
        state === "error"
          ? "0 0 0 3px rgba(239, 68, 68, 0.2)"
          : focused
          ? `0 0 0 3px ${BRAND}18`
          : "none",
    }}
  >
    <input
      ref={inputRef}
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        if (state === "error") setState("idle");
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="votre@email.com"
      disabled={state === "loading"}
      required
      className="flex-1 bg-transparent px-3 py-2.5 sm:py-1.5 text-sm text-white placeholder:text-white/25 outline-none disabled:opacity-50 text-center sm:text-left"
    />
    <button
      type="submit"
      disabled={state === "loading"}
      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all hover:scale-[1.02] sm:hover:scale-[1.03] disabled:opacity-70 disabled:hover:scale-100"
      style={{
        background: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})`,
      }}
    >
      {state === "loading" ? (
        <>
          <span>Envoi...</span>
          <Loader2 size={14} className="animate-spin" />
        </>
      ) : (
        <>
          <span>Réserver mon accès</span>
          <Send size={14} />
        </>
      )}
    </button>
  </div>

  {/* Zone d'erreur */}
  {state === "error" && (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-1.5 text-red-400 text-xs mt-1"
    >
      <AlertCircle size={13} />
      <span>{errorMessage}</span>
    </motion.div>
  )}
</form>
                    </div>
                  </motion.div>
                ) : (
                  /* Écran de confirmation de succès */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})`,
                      }}
                    >
                      <CheckCircle size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl text-white mb-3">
                      Bienvenue dans l'aventure !
                    </h3>
                    <p className="text-white/60 max-w-md text-sm leading-relaxed">
                      Votre place en liste VIP est confirmée. Un email de confirmation vient de vous être envoyé à{" "}
                      <span className="text-white font-medium">{email}</span>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative px-6 pb-8 "
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto pt-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex-shrink-0">
                <div
                  className="absolute inset-0 blur-lg rounded-full"
                  style={{ background: `${BRAND}50` }}
                />
                <img
                  src={logoImage}
                  alt="Richard AI"
                  className="relative w-8 h-8 object-contain rounded-full"
                />
              </div>
              <span className="font-semibold text-white text-sm">Richard AI</span>
            </div>
            <p className="text-xs text-white/35 leading-relaxed text-center sm:text-right">
              L'IA propose, l'humain valide.<br />
              Expertise OHADA · CGI Sénégal · SYSCOHADA.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <p className="text-[11px] text-white/25">
              © 2026 Richard AI. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}