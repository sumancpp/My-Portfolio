import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}



export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body as ContactRequestBody;

    // Input Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your name.' });
    }

    if (!email || typeof email !== 'string' || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({ success: false, message: 'Please specify a message subject.' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message content cannot be empty.' });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'suuman.maity@gmail.com';
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER?.trim();
    const rawPass = process.env.SMTP_PASS?.trim();
    const pass = rawPass ? rawPass.replace(/\s+/g, '') : undefined;


    // HTML Email Template
    const htmlTemplate = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden; border: 1px solid #30363d;">
        <div style="background-color: #161b22; padding: 24px; border-bottom: 2px solid #00f2fe; text-align: center;">
          <h2 style="margin: 0; color: #00f2fe; font-size: 24px; letter-spacing: 1px;">NEW PORTFOLIO TRANSMISSION</h2>
          <p style="margin: 6px 0 0 0; color: #8b949e; font-size: 13px;">Direct message received via Suman Maity's Portfolio</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #8b949e; font-size: 13px; font-weight: bold; width: 100px;">SENDER:</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b949e; font-size: 13px; font-weight: bold;">EMAIL:</td>
              <td style="padding: 8px 0; color: #00f2fe; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #00f2fe; text-decoration: none;">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b949e; font-size: 13px; font-weight: bold;">SUBJECT:</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${subject.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b949e; font-size: 13px; font-weight: bold;">DATE:</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 13px;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)</td>
            </tr>
          </table>
          <div style="background-color: #161b22; border-left: 4px solid #00f2fe; padding: 16px; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; color: #8b949e; font-size: 12px; text-transform: uppercase; font-weight: bold;">MESSAGE CONTENT:</p>
            <p style="margin: 0; color: #e6edf3; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</p>
          </div>
        </div>
        <div style="background-color: #161b22; padding: 16px; text-align: center; border-top: 1px solid #30363d; font-size: 12px; color: #8b949e;">
          Sent from Portfolio Contact Form &bull; Reply directly to this email to respond to ${name.trim()}.
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${name.trim()} via Portfolio" <${user || 'noreply@portfolio.com'}>`,
      replyTo: email.trim(),
      to: receiverEmail,
      subject: `[Portfolio Contact] ${subject.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${subject.trim()}\n\nMessage:\n${message.trim()}`,
      html: htmlTemplate,
    };

    // 1. Try real SMTP credentials if configured
    if (user && pass) {
      try {
        const isGmail = host.toLowerCase().includes('gmail');
        const transporter = isGmail
          ? nodemailer.createTransport({
              service: 'gmail',
              auth: { user, pass },
            })
          : nodemailer.createTransport({
              host,
              port,
              secure: port === 465,
              auth: { user, pass },
              tls: { rejectUnauthorized: false },
            });

        const info = await transporter.sendMail(mailOptions);
        console.log(`[Contact API] Email sent successfully via SMTP (${isGmail ? 'Gmail Service' : host}). Message ID: ${info.messageId}`);
        return res.status(200).json({
          success: true,
          message: 'Transmission sent successfully! Suman will get back to you shortly.',
        });
      } catch (smtpError) {
        console.error('[Contact API] SMTP send failed:', (smtpError as Error).message);
        return res.status(500).json({
          success: false,
          message: `Failed to send email via SMTP (${host}). Please verify SMTP_USER and SMTP_PASS in backend/.env`,
          error: (smtpError as Error).message,
        });
      }
    }

    // 2. Try Ethereal test account for dev mode
    try {
      console.log('[Contact API] SMTP credentials not set in process.env. Attempting Ethereal test account...');
      const testAccount = await nodemailer.createTestAccount();
      const devTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await devTransporter.sendMail(mailOptions);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[Contact API] Sent via Ethereal. Preview URL: ${previewUrl}`);

      return res.status(200).json({
        success: true,
        message: 'Transmission sent successfully! Suman will reply to your message promptly.',
        ...(previewUrl && { testPreviewUrl: previewUrl }),
      });
    } catch (etherealError) {
      console.warn('[Contact API] Ethereal test account unavailable. Fallback to console transmission log:', (etherealError as Error).message);

      // 3. Fallback: Log transmission cleanly to server console without breaking user UI
      console.log('================== CONTACT FORM TRANSMISSION LOG ==================');
      console.log(`FROM: ${name.trim()} <${email.trim()}>`);
      console.log(`TO: ${receiverEmail}`);
      console.log(`SUBJECT: ${subject.trim()}`);
      console.log(`MESSAGE:\n${message.trim()}`);
      console.log('==================================================================');

      return res.status(200).json({
        success: true,
        message: 'Transmission received! Suman will reply to your message promptly.',
        note: 'Message logged in dev server console.',
      });
    }
  } catch (error) {
    console.error('[Contact API] General error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unexpected server error while processing transmission.',
      error: (error as Error).message,
    });
  }
};
