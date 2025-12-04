type MailtoOptions = {
    to: string;
    subject?: string;
    body?: string;
    cc?: string;
    bcc?: string;
  };
  
  export function buildMailtoHref({ to, subject, body, cc, bcc }: MailtoOptions) {
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (body) params.set("body", body);
    if (cc) params.set("cc", cc);
    if (bcc) params.set("bcc", bcc);
  
    const qs = params.toString();
    return `mailto:${to}${qs ? `?${qs}` : ""}`;
  }
  