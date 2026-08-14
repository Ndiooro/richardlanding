import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Accepter uniquement les requêtes POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  // Extraction de l'email
  const { email } = req.body;

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    console.log("⚠️ Email invalide :", email);
    return res.status(400).json({ error: "Veuillez fournir une adresse e-mail valide." });
  }

  const cleanEmail = email.trim();

  try {
    // Configuration de Nodemailer avec Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Template HTML
    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #28741A; margin: 0; font-size: 30px; font-weight: 800; letter-spacing: -0.5px;">Richard AI</h1>
          <div style="width: 40px; height: 3px; background-color: #28741A; margin: 10px auto 0 auto; border-radius: 2px;"></div>
        </div>
        
        <div style="padding: 10px 10px;">
          <h2 style="color: #111827; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; line-height: 1.3;">
            Bienvenue dans la Bêta VIP ! 
          </h2>
          
          <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 18px;">
            Bonjour,
          </p>
          
          <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 18px;">
            Merci d'avoir rejoint la liste d'attente exclusive de <strong>Richard AI</strong>. Votre inscription a bien été enregistrée !
          </p>
          
          <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Vous faites désormais partie de nos utilisateurs privilégiés. Vous bénéficierez d'un accès prioritaire pour tester l'intelligence comptable dédiée aux normes <strong>SYSCOHADA, OHADA et CGI Sénégal</strong>.
          </p>
          
          <div style="background-color: #F2F8F1; border-left: 4px solid #28741A; padding: 16px; margin-bottom: 30px; border-radius: 0 12px 12px 0;">
            <p style="color: #28741A; font-weight: 600; margin: 0; font-size: 14px; line-height: 1.4;">
              Restez attentif à votre boîte mail, nous vous contacterons très prochainement dès l'ouverture des accès Bêta !
            </p>
          </div>
          
          <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 40px; margin-top: 0;">
            À très bientôt,<br>
            <span style="color: #111827; font-weight: 700;">L'équipe Richard AI</span>
          </p>
        </div>
        
        <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; text-align: center;">
          <p style="color: #9CA3AF; font-size: 12px; margin: 0; line-height: 1.5;">
            Cet e-mail a été envoyé automatiquement suite à votre inscription sur richard-ai.com.<br>
            © 2026 Richard AI. Tous droits réservés.
          </p>
        </div>
        
      </div>
    `;

    // Envoi de l'email
    await transporter.sendMail({
      from: `"Richard AI" <${process.env.MAIL_USERNAME}>`,
      to: cleanEmail,
      subject: "Bienvenue sur la Waitlist Richard AI",
      html: htmlContent,
      replyTo: "contact@richard-ai.com",
    });

    console.log(`✅ Email envoyé avec succès à : ${cleanEmail}`);
    return res.status(200).json({ success: true, message: "Email envoyé avec succès" });

  } catch (error) {
    console.error("❌ Erreur d'envoi:", error);
    return res.status(500).json({ error: "Échec de l'envoi de l'email", details: error.message });
  }
}
