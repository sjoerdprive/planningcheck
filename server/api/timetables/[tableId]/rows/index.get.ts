import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";

export default defineEventHandler(async (event) => {
  const tableId = getTableId(event);

  const table = await prismaClient.timeslot.findMany({
    where: { timetableId: tableId },
    orderBy: {
      startTime: "asc",
    },
  });
  return table;
});
