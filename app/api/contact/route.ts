import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// NOTE: instantiated inside the handler so it only runs at request time,
// not at build time (avoids "Missing API key" build error).

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json() as {
    name: string;
    email: string;
    message: string;
  };

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      // Once you verify lovstudio.ca in Resend, change this to:
      // from: "Lov Studio <noreply@lovstudio.ca>",
      from: "Lov Studio Contact <onboarding@resend.dev>",
      to:   ["marketing@lovstudio.ca"],
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-weight: 300; font-size: 22px; letter-spacing: 0.05em; border-bottom: 1px solid #c9a96e; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; margin-top: 24px; font-size: 15px; line-height: 1.8;">
            <tr>
              <td style="padding: 6px 0; color: #8a7445; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; width: 90px;">Name</td>
              <td style="padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #8a7445; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">Email</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #f9f6f0; border-left: 2px solid #c9a96e;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7445;">Message</p>
            <p style="margin: 12px 0 0; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 32px; font-size: 11px; color: #aaa; letter-spacing: 0.05em;">
            Sent via lovstudio.ca contact form · Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }
}
