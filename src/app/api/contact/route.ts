import { buildBrandedEmail, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  website?: string;
  platform?: string;
  plan?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  fax?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = String(body.name || "").trim();
    const business = String(body.business || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const website = String(body.website || "").trim();
    const platform = String(body.platform || "").trim();
    const plan = String(body.plan || "").trim();
    const timeline = String(body.timeline || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();
    const fax = String(body.fax || "").trim();

    if (fax) {
      return new Response("OK", { status: 200 });
    }

    if (!name || !email || !message) {
      return new Response("Missing required fields (name, email, message).", { status: 400 });
    }

    const to = process.env.CONTACT_TO || process.env.SMTP_USER || "anthony@barbaro.tech";
    const subject = `New Quote Request — ${name}`;

    const html = buildBrandedEmail({
      preheader: `New contact request from ${name}`,
      badge: "Contact Form",
      title: "New Project Inquiry",
      subtitle: "Submitted from barbaro.tech/contact",
      sections: [
        {
          title: "Client Details",
          fields: [
            { label: "Name", value: name },
            { label: "Business", value: business || "—" },
            { label: "Email", value: email },
            { label: "Phone", value: phone || "—" },
            { label: "Website", value: website || "—" },
          ],
        },
        {
          title: "Project Scope",
          fields: [
            { label: "Service / Plan", value: plan || "Not specified" },
            { label: "Platform", value: platform || "Not specified" },
            { label: "Timeline", value: timeline || "Not specified" },
            { label: "Budget", value: budget || "Not specified" },
          ],
        },
      ],
      messageTitle: "Project Notes",
      message,
      footerNote: "Reply directly to this email to respond to the lead.",
    });

    await sendEmail({
      to,
      subject,
      replyTo: email,
      html,
      headers: { "X-Mailer": "BarbaroTech Contact Form" },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return new Response("Failed to send request.", { status: 500 });
  }
}
