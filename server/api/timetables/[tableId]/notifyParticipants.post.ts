import { mailTransporter } from "~/lib/nodemailer";
import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";
import { getTestAuthUser } from "~/utils/getTestAuthUser";

export default defineEventHandler(async (event) => {
  const user = getTestAuthUser(event);
  const id = getTableId(event);

  const table = await prismaClient.timetable.findUnique({
    where: {
      id,
    },
  });

  if (!table) return;

  for (const participant of table.sharedWithEmails) {
    if (participant === user.email) continue;

    await mailTransporter.sendMail({
      to: participant,
      from: `Artiql <${process.env.SMTP_USER}>`,
      subject: `${user.name || user.email} heeft ${table?.name} geupdatet`,
      html: `
      <a style="padding: 12px 16px; background: #ee2000; color: white; display: flex; align-items: center; text-decoration: none; border-radius: 8px; font-weight: 600; max-width: fit-content;" href="${process.env.VITE_API_URL}/plannings/${id}">Bekijk de planning</a>
      `,
    });
  }

  return table;
});
