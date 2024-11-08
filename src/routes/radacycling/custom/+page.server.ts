import { BCC_EMAIL, GOOGLE_EMAIL, RECEIVER_EMAIL } from "$env/static/private";
import transporter from "$lib/email/rada.server";
import type { Options } from "nodemailer/lib/mailer";

const sendEmail = async (message: Options) => {
    await new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const firstName = formData.get("firstName");
            const lastName = formData.get("lastName");
            const teamName = formData.get("teamName");
            const email = formData.get("email");
            const phone = formData.get("phone");
            const teamSize = formData.get("teamSize");
            const messageContent = formData.get("message");

            const subject = `${firstName} ${lastName} - RADA Custom Inquiry`;

            // Building the email HTML content
            let html = `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h1 style="font-size: 20px;">
                        RADA Custom Cycling Apparel
                    </h1>
                    <p style="font-size: 16px; color: inherit;">
                        <strong>First Name:</strong> ${firstName}
                    </p>
                    <p style="font-size: 16px; color: inherit;">
                        <strong>Last Name:</strong> ${lastName}
                    </p>
                    <p style="font-size: 16px; color: inherit;">
                        <strong>Team Name:</strong> ${teamName}
                    </p>
                    <p style="font-size: 16px; color: inherit;">
                        <strong>Email:</strong> ${email}
                    </p>
                    <p style="font-size: 16px; color: inherit;">
                        <strong>Phone:</strong> ${phone}
                    </p>
                    <p style="font-size: 16px; color: inherit;">
                        <strong>Team Size:</strong> ${teamSize}
                    </p>
                    <p style="font-size: 16px; color: inherit;">
                        <strong>Message:</strong><br/> ${messageContent || '<i style="display: inline-block;"> No message was added. </i>'}
                    </p>
                </div>
            `;

            const message = {
                from: GOOGLE_EMAIL,
                to: RECEIVER_EMAIL,
                bcc: BCC_EMAIL,
                subject: subject,
                html: html,
            };

            // Send the email
            await sendEmail(message);

            return {
                success: "Email sent successfully.",
            };

        } catch (error) {
            console.error(error);
            return {
                error: "There was an error sending the email.",
            };
        }
    },
};