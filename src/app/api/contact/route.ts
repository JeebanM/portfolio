// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY!);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL!;

export async function POST(req: NextRequest) {
  // Rate limit: 3 submissions per IP per 10 minutes
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { allowed } = rateLimit(ip, "contact", 3, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, email, message, website } = body;

  // Honeypot check — bots fill this hidden field
  if (website) {
    return NextResponse.json({ success: true }); // Fake success for bots
  }

  // Validate fields
  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "Message too long." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New Portfolio Contact — ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #10141a; color: #dfe2eb; padding: 32px; border-radius: 8px;">
          <div style="border-bottom: 1px solid #31353c; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #d0bcff; margin: 0; font-size: 20px;">New Portfolio Contact</h2>
            <p style="color: #958ea0; margin: 4px 0 0; font-size: 13px;">via jeebanmohanty.dev</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #958ea0; font-size: 13px; width: 80px;">From</td>
              <td style="padding: 8px 0; color: #dfe2eb; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #958ea0; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #4cd7f6;">${email}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #1c2026; border-radius: 6px; border-left: 3px solid #d0bcff;">
            <p style="margin: 0; color: #dfe2eb; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 24px;">
            <a href="mailto:${email}" style="display: inline-block; background: #d0bcff; color: #3c0091; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ${name}</a>
          </div>
          <p style="margin-top: 24px; color: #494454; font-size: 12px;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
