// API Route
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        const result = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "aryel.soares22@gmail.com",
            subject,
            html: `
                <h2>📩 New form message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <div>${message}</div>
            `,
        });

        if (!result || !result.data) {
            throw new Error("Failed to send email: invalid API key or bad request");
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("Error sending email:", err);
        return new Response(JSON.stringify({ success: false, error: err.message || "Failed to send email" }), { status: 500 });
    }
}