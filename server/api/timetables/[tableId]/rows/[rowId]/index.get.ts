import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";
import { getTableRowId } from "~/utils/getTableRowId";

export default defineEventHandler(async (event) => {
  const timetableId = getTableId(event);
  const id = getTableRowId(event);

  const table = await prismaClient.timeslot.findUnique({
    where: { timetableId, id },
  });
  return table;
});
