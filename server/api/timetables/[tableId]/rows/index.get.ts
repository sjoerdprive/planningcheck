import prismaClient from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  if (!params.tableId) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required to fetch a timetable",
    });
  }

  console.log("Fetching timetable with ID:", params.tableId);

  const table = await prismaClient.timeslot.findMany({
    where: { timetableId: params.tableId as string },
  });
  return table;
});
