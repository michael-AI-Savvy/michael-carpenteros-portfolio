import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(2000),
});

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const TO_EMAIL = "michaelcarpenteros@gmail.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", issues: parsed.error.issues },
            { status: 400 },
          );
        }

        const { name, email, subject, message } = parsed.data;

        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!LOVABLE_API_KEY) {
          return Response.json(
            { error: "Email service not configured (missing LOVABLE_API_KEY)" },
            { status: 500 },
          );
        }
        if (!RESEND_API_KEY) {
          return Response.json(
            { error: "Email service not configured (missing RESEND_API_KEY)" },
            { status: 500 },
          );
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

        const html = `
          <div style="font-family: Arial, sans-serif; color:#111; line-height:1.5;">
            <h2 style="margin:0 0 16px;">New portfolio contact</h2>
            <p style="margin:0 0 8px;"><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
            <p style="margin:0 0 16px;"><strong>Subject:</strong> ${safeSubject}</p>
            <div style="padding:12px 14px; background:#f6f8fa; border-radius:8px; white-space:pre-wrap;">${safeMessage}</div>
          </div>
        `;

        const text = `New portfolio contact\n\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;

        const res = await fetch(`${GATEWAY_URL}/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [TO_EMAIL],
            reply_to: email,
            subject: `[Portfolio] ${subject}`,
            html,
            text,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.error("Resend gateway error", res.status, data);
          return Response.json(
            { error: "Failed to send email", status: res.status, details: data },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
