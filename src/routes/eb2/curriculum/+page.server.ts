import { GOOGLE_EMAIL, RECEIVER_EMAIL } from "$env/static/private";
import transporter from "$lib/email/eb2.server";
import { db } from "$lib/firebase/eb2.server";
import { addDoc, collection } from 'firebase/firestore';
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
            const fullName = formData.get("fullName");
            const email = formData.get("email");
            const phone = formData.get("phone");
            const linkedin = formData.get("linkedin");
            const cvFile = formData.get("cv") as File | null;

            if (!linkedin && (!cvFile || !cvFile?.name)) {
                return {
                    error: "There was an error sending the email.",
                };
            }

            const subject = `${fullName} quiere una evaluación de su perfil para obtener una Visa EB2`;

            let cvAttachment = null;
            if (cvFile?.name) {
                const arrayBuffer = await cvFile.arrayBuffer();
                cvAttachment = Buffer.from(arrayBuffer);
            }

            // Build the HTML content to display the form data
            let html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
                    <h1 style="background-color: #f27931; font-size: 1.5rem; color: white; padding: 10px; border-radius: 5px;">
                        Solicitud de Evaluación EB2
                    </h1>
                    <p style="font-size: 16px; margin: 10px 0; color: inherit;">
                        <strong>Nombre Completo:</strong> ${fullName}
                    </p>
                    <p style="font-size: 16px; margin: 10px 0; color: inherit;">
                        <strong>Correo Electrónico:</strong> ${email}
                    </p>
                    <p style="font-size: 16px; margin: 10px 0; color: inherit;">
                        <strong>Teléfono:</strong> ${phone || "No proporcionado"}
                    </p>
                    <p style="font-size: 16px; margin: 10px 0;">
                        <strong>LinkedIn:</strong> 
                        ${linkedin
                    ? `<a href="${linkedin}" target="_blank">
                                    ${linkedin}
                                </a>`
                    : "No proporcionado"
                }
                    </p>
                    ${cvFile?.name
                    ? `<p style="font-size: 16px; margin: 10px 0;"><strong>CV adjunto:</strong> ${cvFile?.name}</p>`
                    : "<p style='font-size: 16px; margin: 10px 0;'><strong>CV:</strong> No se adjuntó un archivo</p>"
                }
                </div>
            `;

            const message = {
                from: GOOGLE_EMAIL,
                to: RECEIVER_EMAIL,
                subject: subject,
                html: html,
                attachments: cvAttachment
                    ? [
                        {
                            filename: cvFile?.name,
                            content: cvAttachment,
                            contentType: cvFile?.type,
                        },
                    ]
                    : [],
            };

            // Store request on the database
            const colReference = collection(db, 'solicitudes');
            await addDoc(colReference, { fullName, email, phone, linkedin });

            // Send mail
            await sendEmail(message);

            return {
                success: "Email sent.",
            };

        } catch (error) {
            console.error(error);
            return {
                error: "There was an error sending the email.",
            };
        }
    },
};