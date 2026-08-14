// api/waitlist.js
// Fonction serverless Vercel (runtime Node.js) — garde ta logique Nodemailer telle quelle,
// seule la "coquille" autour change (handler req/res au lieu d'un serveur Express).

import nodemailer from "nodemailer";

async function sendMail({ to, subject, text, replyTo }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    text,
    replyTo,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }

  try {
    // 1. Écrire dans le Google Sheet
    const sheetResponse = await fetch(process.env.SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, date: new Date().toISOString() }),
    });

    if (!sheetResponse.ok) {
      console.error("Échec écriture Sheet:", await sheetResponse.text());
    }

    // 2. Envoyer le mail de confirmation
    await sendMail({
      to: email,
      subject: "Ton inscription à la liste d'attente Richard est confirmée",
      text: "Merci de t'être inscrit·e à la liste d'attente de Richard ! On te préviendra dès le lancement.",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur inscription waitlist:", error);
    res.status(500).json({ error: "Une erreur est survenue, réessaie." });
  }
}