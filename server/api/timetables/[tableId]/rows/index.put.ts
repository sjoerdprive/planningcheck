import { Prisma } from "@prisma/client";
import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";
import { updateTimetableUpdatedAt } from "~/utils/updateTimetableUpdatedAt";

export default defineEventHandler(async (event) => {
  const timetableId = getTableId(event);
  const rows = (await readBody(event)) as Prisma.TimeslotUpdateInput[];

  updateTimetableUpdatedAt(timetableId);

  let newRows = [];

  for (const { id, ...data } of rows) {
    const newRow = await prismaClient.timeslot.update({
      where: {
        id: id as string,
        timetableId,
      },
      data,
    });

    newRows.push(newRow);
  }

  return newRows;
});
