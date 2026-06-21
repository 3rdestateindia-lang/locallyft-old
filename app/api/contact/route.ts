import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, phone, business } = await req.json();

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: '3rdestateindia@gmail.com',
            subject: '🚀 New Discovery Call Request',
            html: `
        <h2>New Lead Received</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Business:</strong> ${business || 'Not provided'}</p>
      `,
        });

        return Response.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}