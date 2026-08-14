import { sendMail } from "../../lib/sendmail"; // Modifiez le chemin selon votre structure

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email requis" }), { status: 400 });
    }

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #28741A; margin: 0; font-size: 30px; font-weight: 800;">Richard AI</h1>
          <div style="width: 40px; height: 3px; background-color: #28741A; margin: 10px auto 0 auto; border-radius: 2px;"></div>
        </div>
        <div style="padding: 10px 10px;">
          <h2 style="color: #111827; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px;">
            Bienvenue dans la Bêta VIP !
          </h2>
          <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Bonjour,</p>
          <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
            Merci d'avoir rejoint la liste d'attente exclusive de <strong>Richard AI</strong>. Votre inscription a bien été enregistrée !
          </p>
          <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
            Vous bénéficierez d'un accès prioritaire pour tester l'intelligence comptable dédiée aux normes <strong>SYSCOHADA, OHADA et CGI Sénégal</strong>.
          </p>
          <div style="background-color: #F2F8F1; border-left: 4px solid #28741A; padding: 16px; margin: 20px 0; border-radius: 0 12px 12px 0;">
            <p style="color: #28741A; font-weight: 600; margin: 0; font-size: 14px;">
              Restez attentif à votre boîte mail, nous vous contacterons très prochainement dès l'ouverture des accès Bêta !
            </p>
          </div>
          <p style="color: #4B5563; font-size: 16px; margin-top: 30px;">
            À très bientôt,<br>
            <strong style="color: #111827;">L'équipe Richard AI</strong>
          </p>
        </div>
      </div>
    `;

    // Appel de votre fonction sendMail
    await sendMail({
      to: email,
      subject: "Bienvenue sur la Waitlist Richard AI",
      html: htmlContent, // Utilisation de la version HTML du mail
      replyTo: "contact@richard-ai.com",
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur lors de l'envoi de l'email:", error);
    return new Response(JSON.stringify({ error: "Échec de l'envoi de l'email" }), { status: 500 });
  }
}