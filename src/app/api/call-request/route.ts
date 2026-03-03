import { buildBrandedEmail, sendEmail } from "@/lib/email";
import { isContactIntakeEnabled } from "@/lib/flags";

export const runtime = "nodejs";

type CallRequestBody = {
  name?: string;
  email?: string;
  business?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  method?: string;
  notes?: string;
  context?: string;
  fax?: string;
};

export async function POST(request: Request) {
  if (!isContactIntakeEnabled()) {
    return new Response("Call booking is temporarily unavailable.", { status: 503 });
  }

  try {
    const body = (await request.json()) as CallRequestBody;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const business = String(body.business || "").trim();
    const phone = String(body.phone || "").trim();
    const preferredDate = String(body.preferredDate || "").trim();
    const preferredTime = String(body.preferredTime || "").trim();
    const timezone = String(body.timezone || "").trim();
    const method = String(body.method || "Zoom").trim();
    const notes = String(body.notes || "").trim();
    const context = String(body.context || "").trim();
    const fax = String(body.fax || "").trim();

    if (fax) {
      return new Response("OK", { status: 200 });
    }

    if (!name || !email || !preferredDate || !preferredTime) {
      return new Response("Missing required fields for call request.", { status: 400 });
    }

    if (method.toLowerCase() === "phone") {
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        return new Response("A valid phone number is required for phone calls.", { status: 400 });
      }
    }

    const to = process.env.CALL_TO || process.env.CONTACT_TO || process.env.SMTP_USER || "anthony@barbaro.tech";
    const subject = `New Call Request — ${name}`;

    const html = buildBrandedEmail({
      preheader: `New call request from ${name}`,
      badge: "Call Booking",
      title: "New Call Booking Request",
      subtitle: "Submitted from barbaro.tech/contact",
      sections: [
        {
          title: "Contact Details",
          fields: [
            { label: "Name", value: name },
            { label: "Email", value: email },
            { label: "Business", value: business || "—" },
            { label: "Phone", value: phone || "—" },
            { label: "Context", value: context || "General inquiry" },
          ],
        },
        {
          title: "Requested Slot",
          fields: [
            { label: "Meeting Type", value: method },
            { label: "Preferred Date", value: preferredDate },
            { label: "Preferred Time", value: preferredTime },
            { label: "Timezone", value: timezone || "Not provided" },
          ],
        },
      ],
      messageTitle: "Call Notes",
      message: notes || "No additional notes provided.",
      footerNote: "Reply directly to this email to confirm the meeting.",
    });

    await sendEmail({
      to,
      subject,
      replyTo: email,
      html,
      headers: { "X-Mailer": "BarbaroTech Call Request Form" },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("CALL REQUEST API ERROR:", error);
    return new Response("Failed to send call request.", { status: 500 });
  }
}
