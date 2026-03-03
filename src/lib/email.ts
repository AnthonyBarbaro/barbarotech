import nodemailer from "nodemailer";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  headers?: Record<string, string>;
};

type EmailField = {
  label: string;
  value: string;
};

type EmailSection = {
  title: string;
  fields: EmailField[];
};

type BrandedEmailOptions = {
  preheader: string;
  badge: string;
  title: string;
  subtitle: string;
  sections: EmailSection[];
  messageTitle?: string;
  message?: string;
  footerNote?: string;
};

function asBoolean(value: string | undefined) {
  return value === "true" || value === "1";
}

function parsePort(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const port = Number(value);
  if (Number.isNaN(port)) return fallback;
  return port;
}

function requireEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getTransporter() {
  const host = requireEnv("SMTP_HOST", process.env.SMTP_HOST);
  const user = requireEnv("SMTP_USER", process.env.SMTP_USER);
  const pass = requireEnv("SMTP_PASS", process.env.SMTP_PASS);
  const port = parsePort(process.env.SMTP_PORT, 587);
  const secure = process.env.SMTP_SECURE ? asBoolean(process.env.SMTP_SECURE) : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendEmail({ to, subject, html, replyTo, headers }: SendEmailOptions) {
  const from = process.env.CONTACT_FROM || process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("Missing CONTACT_FROM (or SMTP_FROM / SMTP_USER) environment variable.");
  }

  const transporter = getTransporter();
  await transporter.sendMail({
    from,
    to,
    subject,
    replyTo,
    html,
    headers,
  });
}

export function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function htmlRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #e5e7eb;width:190px;color:#334155;font-weight:600;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#0f172a;">
        ${escapeHtml(value || "—")}
      </td>
    </tr>
  `;
}

function sectionRows(fields: EmailField[]) {
  return fields
    .map((field) => {
      const safeLabel = escapeHtml(field.label);
      const safeValue = escapeHtml(field.value || "—");
      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:180px;color:#334155;font-size:13px;font-weight:600;vertical-align:top;">
            ${safeLabel}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;vertical-align:top;">
            ${safeValue}
          </td>
        </tr>
      `;
    })
    .join("");
}

export function buildBrandedEmail({
  preheader,
  badge,
  title,
  subtitle,
  sections,
  messageTitle,
  message,
  footerNote,
}: BrandedEmailOptions) {
  const safePreheader = escapeHtml(preheader);
  const safeBadge = escapeHtml(badge);
  const safeTitle = escapeHtml(title);
  const safeSubtitle = escapeHtml(subtitle);
  const safeFooter = escapeHtml(footerNote || "BarbaroTech site form notification");
  const safeMessageTitle = escapeHtml(messageTitle || "Details");
  const safeMessage = message ? escapeHtml(message).replace(/\n/g, "<br />") : "";
  const receivedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const renderedSections = sections
    .map((section) => {
      const safeSectionTitle = escapeHtml(section.title);
      return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #dbeafe;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="padding:12px 14px;background:#eff6ff;border-bottom:1px solid #dbeafe;color:#0f172a;font-size:13px;font-weight:700;">
              ${safeSectionTitle}
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tbody>
                  ${sectionRows(section.fields)}
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      `;
    })
    .join('<div style="height:12px;line-height:12px;">&nbsp;</div>');

  const messageBlock = message
    ? `
      <div style="height:12px;line-height:12px;">&nbsp;</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #dbeafe;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:12px 14px;background:#eff6ff;border-bottom:1px solid #dbeafe;color:#0f172a;font-size:13px;font-weight:700;">
            ${safeMessageTitle}
          </td>
        </tr>
        <tr>
          <td style="padding:14px;color:#0f172a;font-size:13px;line-height:1.65;background:#f8fbff;">
            ${safeMessage}
          </td>
        </tr>
      </table>
    `
    : "";

  return `
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${safePreheader}
    </div>
    <div style="margin:0;padding:24px;background:#f1f5f9;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;border-collapse:collapse;background:#ffffff;border:1px solid #dbeafe;border-radius:20px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;background:linear-gradient(135deg,#0f172a 0%,#0369a1 100%);">
                  <div style="display:inline-block;padding:4px 10px;border:1px solid rgba(255,255,255,0.35);border-radius:999px;color:#dbeafe;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                    ${safeBadge}
                  </div>
                  <h1 style="margin:14px 0 6px 0;color:#ffffff;font-size:24px;line-height:1.2;font-weight:700;">
                    ${safeTitle}
                  </h1>
                  <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.5;">
                    ${safeSubtitle}
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 22px 16px 22px;">
                  ${renderedSections}
                  ${messageBlock}
                </td>
              </tr>
              <tr>
                <td style="padding:14px 22px 20px 22px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.5;">
                  <div>Received: ${escapeHtml(receivedAt)}</div>
                  <div>${safeFooter}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}
