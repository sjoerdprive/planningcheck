import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";

export default defineEventHandler(async (event) => {
  const id = getTableId(event);

  const table = await prismaClient.timetable.delete({
    where: {
      id,
    },
  });

  return table;
});
