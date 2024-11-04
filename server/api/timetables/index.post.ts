import prismaClient from "~/lib/prisma";
import { getTestAuthUser } from "~/utils/getTestAuthUser";

export default defineEventHandler(async (event) => {
  const user = getTestAuthUser(event);

  const tables = await prismaClient.timetable.create({
    data: {
      date: new Date(),
      name: "New Timetable",
      owner: {
        connect: user,
      },
    },
  });
  return tables;
});
