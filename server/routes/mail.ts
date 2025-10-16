/**
 * Mail Route Handler
 * 
 * Handles contact form submissions via SMTP
 * Validates input with Zod schema and sends emails using Nodemailer
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import type { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(200),
  message: z.string().min(5).max(5000),
});

export const handleMail: RequestHandler = async (req, res) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "INVALID_INPUT", issues: parsed.error.flatten() });
    }

    const { name, email, subject, message } = parsed.data;

    const host = process.env.MAIL_HOST;
    const port = Number(process.env.MAIL_PORT || 465);
    const user = process.env.MAIL_USERNAME; // SMTP kullanıcı mail
    const pass = process.env.MAIL_PASSWORD; // Uygulama şifresi
    const encryption = (process.env.MAIL_ENCRYPTION || "").toLowerCase(); // ssl | tls
    const fromName = process.env.MAIL_FROM_NAME || "Website";
    const to = process.env.MAIL_TO; // senin alıcı mail adresin

    if (!host || !user || !pass || !to) {
      return res.status(500).json({ ok: false, error: "MAIL_NOT_CONFIGURED" });
    }

    const isSsl = port === 465 || encryption === "ssl";
    const requireTls = encryption === "tls";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: isSsl,
      requireTLS: requireTls,
      auth: { user, pass },
    });

    await transporter.verify();

    const mailOptions = {
      from: `${fromName} <${user}>`,
      replyTo: `${name} <${email}>`,
      to,
      subject: `Erdem Kahraman Web Site - ${subject}`,
      text: message,
      html: `
        <div>
          <p><strong>Gönderen:</strong> ${name} (${email})</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return res.json({ ok: true, id: info.messageId, accepted: info.accepted, rejected: info.rejected });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: "MAIL_SEND_FAILED", detail: err.message });
  }
};
