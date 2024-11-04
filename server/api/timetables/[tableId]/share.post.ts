import prismaClient from "~/lib/prisma";
import { getTestAuthUser } from "~/utils/getTestAuthUser";

export default defineEventHandler(async (event) => {
  const user = getTestAuthUser(event);
  const { targetEmail } = await readBody(event);
  const { tableId } = getRouterParams(event);

  if (!tableId) {
    throw new Error("No tableId provided");
  }

  const tables = await prismaClient.timetable.update({
    where: {
      id: tableId,
    },
    data: {
      sharedBy: {
        set: user.email,
      },
      sharedWith: {
        connect: {
          email: targetEmail,
        },
      },
      sharedWithEmails: {
        push: targetEmail,
      },
    },
  });
  return tables;
});
