import { mailTransporter } from "~/lib/nodemailer";
import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";
import { getTestAuthUser } from "~/utils/getTestAuthUser";

export default defineEventHandler(async (event) => {
  const user = getTestAuthUser(event);
  const { targetEmail } = await readBody(event);
  const id = getTableId(event);

  if (!targetEmail) {
    createError({
      statusCode: 400,
      message: "No target email provided",
    });
  }

  const targetUser = await prismaClient.user.findUnique({
    where: {
      email: targetEmail,
    },
  });

  const table = await prismaClient.timetable.update({
    where: {
      id,
    },
    data: {
      sharedBy: {
        set: user.email,
      },
      sharedWith: targetUser ? { connect: targetUser } : undefined,
    },
  });

  mailTransporter.sendMail({
    to: targetEmail,
    from: `Artiql <${process.env.SMTP_USER}>`,
    subject: `${user.name || user.email} heeft je uitgenodigd voor ${
      table.name
    }`,
    html: `
  <h1>Je bent uitgenodigd voor een planning</h1>
  <a style="padding: 12px 16px; background: #ee2000; color: white; display: flex; align-items: center; text-decoration: none; border-radius: 8px; font-weight: 600; max-width: fit-content;" href="${process.env.VITE_API_URL}/plannings/${id}">Bekijk hem hier</a>
  `,
  });

  return table;
});
