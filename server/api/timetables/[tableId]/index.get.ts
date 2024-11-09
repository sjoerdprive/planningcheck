import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";
import { getTestUser } from "~/utils/getTestUser";

export default defineEventHandler(async (event) => {
  const id = getTableId(event);

  const table = await prismaClient.timetable.findUnique({
    where: {
      id,
    },
  });
  return table;
});
