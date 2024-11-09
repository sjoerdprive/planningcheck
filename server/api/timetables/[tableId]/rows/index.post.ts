import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";
import { updateTimetableUpdatedAt } from "~/utils/updateTimetableUpdatedAt";

export default defineEventHandler(async (event) => {
  const timetableId = getTableId(event);

  updateTimetableUpdatedAt(timetableId);

  const newRow = await prismaClient.timeslot.create({
    data: {
      timetableId,
      title: "",
      startTime: new Date(),
    },
  });

  return newRow;
});
